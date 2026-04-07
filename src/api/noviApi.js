import axios from "axios";

const PROJECT_ID =
    "eba90068-fdfc-4ba0-957f-bf532ad23f03";

const noviApi = axios.create({
    baseURL:
        "https://novi-backend-api-wgsgz.ondigitalocean.app",
    headers: {
        "X-API-Key": PROJECT_ID,
        "novi-education-project-id": PROJECT_ID,
        "Content-Type": "application/json",
    },
});

export default noviApi;