import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import "./CardDetail.css";
import tcgdexApi from "../../services/tcgdexApi";
import {useCollection} from "../../context/CollectionContext.jsx";
import {fetchCardPrice} from "../../api/cardPriceApi.js";

function CardDetail() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {addToCollection} = useCollection();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const {isAuthenticated} = useAuth();
    const [cardPrice, setCardPrice] = useState(0);
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

    useEffect(() => {
        async function loadPrice() {
            if (!isAuthenticated || !card) return;

            const price = await fetchCardPrice(card.id);
            setCardPrice(price);
        }

        loadPrice();
    }, [card, isAuthenticated]);

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
                        {isAuthenticated && (
                            <p className="detail-price">
                                {cardPrice > 0
                                    ? `Current market price: €${cardPrice.toFixed(2)}`
                                    : "Price unavailable"}
                            </p>
                        )}
                        <div className="detail-buttons">
                            <button
                                className="back-button"
                                onClick={() =>
                                    navigate("/search", {
                                        state: {
                                            currentPage: location.state?.currentPage,
                                            searchTerm: location.state?.searchTerm,
                                        },
                                    })
                                }
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