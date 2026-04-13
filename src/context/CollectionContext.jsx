import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useAuth } from "./AuthContext";

const CollectionContext = createContext();

export function CollectionProvider({
                                       children,
                                   }) {
    const { user, status } = useAuth();

    const storageKey = user
        ? `pokemonCollection_${user.email}`
        : "pokemonCollection_guest";

    const [collection, setCollection] =
        useState([]);

    const [isLoaded, setIsLoaded] =
        useState(false);

    useEffect(() => {
        if (status !== "done") return;

        const savedCards =
            localStorage.getItem(storageKey);

        setCollection(
            savedCards
                ? JSON.parse(savedCards)
                : []
        );

        setIsLoaded(true);
    }, [storageKey, status]);

    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            storageKey,
            JSON.stringify(collection)
        );
    }, [
        collection,
        storageKey,
        isLoaded,
    ]);

    function addToCollection(card) {
        const alreadyExists =
            collection.some(
                (savedCard) =>
                    savedCard.id === card.id
            );

        if (!alreadyExists) {
            setCollection((prev) => [
                ...prev,
                card,
            ]);
        }
    }

    function removeFromCollection(cardId) {
        setCollection((prev) =>
            prev.filter(
                (card) => card.id !== cardId
            )
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