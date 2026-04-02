import { createContext, useContext, useEffect, useState } from "react";

const CollectionContext = createContext();

export function CollectionProvider({ children }) {
    const [collection, setCollection] = useState(() => {
        const savedCards = localStorage.getItem("pokemonCollection");
        return savedCards ? JSON.parse(savedCards) : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "pokemonCollection",
            JSON.stringify(collection)
        );
    }, [collection]);

    function addToCollection(card) {
        const alreadyExists = collection.some(
            (savedCard) => savedCard.id === card.id
        );

        if (!alreadyExists) {
            setCollection((prev) => [...prev, card]);
        }
    }

    function removeFromCollection(cardId) {
        setCollection((prev) =>
            prev.filter((card) => card.id !== cardId)
        );
    }

    return (
        <CollectionContext.Provider
            value={{
                collection,
                addToCollection,
                removeFromCollection,
            }}
        >
            {children}
        </CollectionContext.Provider>
    );
}

export function useCollection() {
    return useContext(CollectionContext);
}