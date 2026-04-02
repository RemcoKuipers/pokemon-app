import { useCollection } from "../../context/CollectionContext";
import "./Collection.css";

function Collection() {
    const { collection, removeFromCollection } = useCollection();

    return (
        <section className="collection-page">
            <h1>My Collection</h1>

            {collection.length === 0 ? (
                <p>No cards added yet.</p>
            ) : (
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

                            <button
                                onClick={() =>
                                    removeFromCollection(card.id)
                                }
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Collection;