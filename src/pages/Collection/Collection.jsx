import { useEffect, useState } from "react";
import { useCollection } from "../../context/CollectionContext";
import { useAuth } from "../../context/AuthContext";
import { fetchCardPrice } from "../../api/cardPriceApi";
import "./Collection.css";

function Collection() {
    const { collection, removeFromCollection } =
        useCollection();

    const { isAuthenticated } = useAuth();

    const [prices, setPrices] = useState({});

    useEffect(() => {
        async function loadPrices() {
            if (!isAuthenticated) return;

            const updatedPrices = {};

            for (const card of collection) {
                const price =
                    await fetchCardPrice(card.id);

                updatedPrices[card.id] = price;
            }

            setPrices(updatedPrices);
        }

        loadPrices();
    }, [collection, isAuthenticated]);

    const totalValue = isAuthenticated
        ? Object.values(prices).reduce(
            (sum, price) => sum + price,
            0
        )
        : 0;

    return (
        <section className="collection-page">
            <h1>My Collection</h1>

            {collection.length === 0 ? (
                <p>No cards added yet.</p>
            ) : (
                <>
                    <div className="collection-grid">
                        {collection.map((card) => (
                            <div
                                key={card.id}
                                className="collection-card"
                            >
                                <img
                                    src={`${card.image}/high.png`}
                                    alt={card.name}
                                    onError={(e) => {
                                        e.target.src =
                                            `${card.image}/low.png`;
                                    }}
                                />

                                <p>{card.name}</p>

                                {isAuthenticated && (
                                    <p className="card-price">
                                        {prices[card.id] > 0
                                            ? `€${prices[card.id].toFixed(2)}`
                                            : "Price unavailable"}
                                    </p>
                                )}

                                <button
                                    onClick={() =>
                                        removeFromCollection(
                                            card.id
                                        )
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {isAuthenticated && (
                        <div className="collection-total">
                            Total value: €
                            {totalValue.toFixed(2)}
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default Collection;