import "./Home.css";

function Home() {
    return (
        <section className="home">
            <div className="welcome-text">
                <h1>Welcome, Trainer!</h1>

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
                <div className="placeholder-card">
                    Pokémon Card Preview
                </div>
            </div>
        </section>
    );
}

export default Home;