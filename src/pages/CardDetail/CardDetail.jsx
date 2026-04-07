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
                <div className="card-detail-container">
                    <div className="card-image-wrapper">
                        <img
                            src={`${card.image}/high.png`}
                            alt={card.name}
                            className="detail-card-image"
                            onError={(e) => {
                                e.target.src = `${card.image}/low.png`;
                            }}
                        />
                    </div>

                    <div className="card-info">
                        <h1>{card.name}</h1>

                        <p><strong>HP:</strong> {card.hp}</p>
                        <p><strong>Type:</strong> {card.types?.join(", ")}</p>
                        <p><strong>Rarity:</strong> {card.rarity}</p>
                        <p><strong>Set:</strong> {card.set?.name}</p>

                        <div className="detail-buttons">
                            <button
                                className="back-button"
                                onClick={() => navigate("/search")}
                            >
                                Back
                            </button>

                            <button
                                className="save-button"
                                onClick={() => addToCollection(card)}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default CardDetail;