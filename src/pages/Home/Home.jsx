import "./Home.css";
import PokemonCard from "../../assets/PokemonCard.png";

function Home() {
    return (
        <section className="home">

            <div className="welcome-text">
                <h2>Welcome, Trainer!</h2>

                <p>
                    This app helps you manage your Pokémon card
                    collection in one clear overview.
                </p>

                <p>
                    Search cards, add them to your collection,
                    and instantly see their current value.
                </p>
            </div>

            <div className="card-preview">
                <img
                    src={PokemonCard}
                    alt="Pokemon home card"
                    className="home-card-image"
                />
            </div>

        </section>
    );
}

export default Home;