import {useEffect, useState} from "react";
import "./Search.css";
import tcgdexApi from "../../services/tcgdexApi";
import {useNavigate} from "react-router-dom";

function Search() {
    const [cards, setCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCards();
    }, []);

    async function fetchCards() {
        try {
            const result = await tcgdexApi.get("/cards");

            const limitedCards = result.data.slice(0, 12);

            setCards(limitedCards);
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

    return (
        <section className="search-page">
            <div className="search-header">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <p>Loading cards...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div className="card-grid">
                        {filteredCards.slice(0, 6).map((card) => (
                            <div
                                key={card.id}
                                className="card-item"
                                onClick={() => navigate(`/card/${card.id}`)}
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
                        <button>Previous</button>
                        <button>Next</button>
                    </div>
                </>
            )}
        </section>
    );
}

export default Search;