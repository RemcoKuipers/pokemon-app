import {useEffect, useState} from "react";
import "./Search.css";
import tcgdexApi from "../../services/tcgdexApi";
import {useLocation, useNavigate} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner.jsx";

function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState(
        location.state?.searchTerm || "");
    const [currentPage, setCurrentPage] = useState(
        location.state?.currentPage || 1);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cardsPerPage = 6;

    useEffect(() => {
        fetchCards();
    }, []);

    async function fetchCards() {
        try {
            const result = await tcgdexApi.get("/cards");

            setCards(result.data);
        } catch (e) {
            console.error(e);
            setError("Failed to load cards");
        } finally {
            setLoading(false);
        }
    }

    const filteredCards = cards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const paginatedCards = filteredCards.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

    function goToNextPage() {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    }

    function goToPreviousPage() {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }

    return (
        <section className="search-page">
            <div className="search-header">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            {loading ? (
                <Spinner />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div className="card-grid">
                        {paginatedCards.map((card) => (
                            <div
                                key={card.id}
                                className="card-item"
                                onClick={() =>
                                    navigate(`/card/${card.id}`, {
                                        state: {
                                            currentPage,
                                            searchTerm,
                                        },
                                    })
                                }
                            >
                                <img
                                    src={`${card.image}/high.png`}
                                    alt={card.name}
                                    onError={(e) => {
                                        e.target.src = `${card.image}/low.png`;
                                    }}
                                />
                                <p>{card.name}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pagination">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}

export default Search;