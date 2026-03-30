import { useEffect, useState } from "react";
import "./Search.css";
import tcgdexApi from "../../services/tcgdexApi";

function Search() {
    const [cards, setCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <h1>Search Pokémon Cards</h1>

            <input
                type="text"
                placeholder="Search card..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading ? (
                <p>Loading cards...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="card-grid">
                    {filteredCards.map((card) => (
                        <div key={card.id} className="card-item">
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
            )}
        </section>
    );
}

export default Search;