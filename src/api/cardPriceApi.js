import axios from "axios";

const tcgMarketApi = axios.create({
    baseURL: "https://api.tcgdex.net",
});

export async function fetchCardPrice(cardId) {
    try {
        const response = await tcgMarketApi.get(
            `/v2/en/cards/${cardId}`
        );

        const card = response.data;

        return (
            card?.pricing?.cardmarket?.trend ||
            card?.pricing?.cardmarket?.avg ||
            card?.pricing?.cardmarket?.low ||
            card?.pricing?.tcgplayer?.normal
                ?.marketPrice ||
            card?.pricing?.tcgplayer?.reverse
                ?.marketPrice ||
            0
        );
    } catch (error) {
        console.error("PRICE ERROR:", error);
        return 0;
    }
}