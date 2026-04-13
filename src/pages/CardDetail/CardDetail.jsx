import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import "./CardDetail.css";
import tcgdexApi from "../../services/tcgdexApi";
import {useCollection} from "../../context/CollectionContext.jsx";
import {fetchCardPrice} from "../../api/cardPriceApi.js";
import spinner from "../../components/Spinner/Spinner.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";

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
    const [addedMessage, setAddedMessage] = useState(false);

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

    function handleAddCard() {
        addToCollection(card);

        setAddedMessage(true);

        setTimeout(() => {
            setAddedMessage(false);
        }, 2000);
    }

    return (
        <section className="card-detail-page">
            {loading ? (
                <Spinner />
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
                            {!isAuthenticated && (
                                <p className="login-hint">
                                    Log in to add cards to your collection
                                </p>
                            )}

                            {isAuthenticated && (
                                <div className="add-button-wrapper">
                                    <button
                                        className="save-button"
                                        onClick={handleAddCard}
                                    >
                                        Add to Collection
                                    </button>

                                    {addedMessage && (
                                        <p className="added-message">
                                            Card added to collection
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default CardDetail;