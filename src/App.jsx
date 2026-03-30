import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import CardDetail from "./pages/CardDetail/CardDetail";
import Collection from "./pages/Collection/Collection";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <div className="layout">
            <Navbar />

            <main className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/card/:id" element={<CardDetail />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;