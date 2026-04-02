import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "./CardDetail.css";
import tcgdexApi from "../../services/tcgdexApi";
import {useCollection} from "../../context/CollectionContext.jsx";

function CardDetail() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {addToCollection} = useCollection();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCard();
    }, [id]);

    async function fetchCard() {
        try {
            const result = await tcgdexApi.get(`/cards/${id}`);
            setCard(result.data);
        } catch (e) {
            console.error(e);
            setError("Failed to load card");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="card-detail-page">
            {loading ? (
                <p>Loading card...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div className="card-detail-container">
                        <img
                            src={`${card.image}/high.png`}
                            alt={card.name}
                            onError={(e) => {
                                e.target.src = `${card.image}/low.png`;
                            }}
                        />

                        <div className="card-info">
                            <h1>{card.name}</h1>

                            <p><strong>HP:</strong> {card.hp}</p>
                            <p><strong>Type:</strong> {card.types?.join(", ")}</p>
                            <p><strong>Rarity:</strong> {card.rarity}</p>
                            <p><strong>Set:</strong> {card.set?.name}</p>

                            <button
                                className="back-button"
                                onClick={() => navigate("/search")}
                            >
                                ← Back to search
                            </button>
                            <button
                            className="save-button"
                            onClick={() => addToCollection(card)}
                            >
                                + Add to your collection
                            </button>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

export default CardDetail;