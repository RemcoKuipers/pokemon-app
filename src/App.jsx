import {Routes, Route, useNavigate} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import CardDetail from "./pages/CardDetail/CardDetail";
import Collection from "./pages/Collection/Collection";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import "./App.css"

function App() {

    const {logout, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div className="layout">
            <Navbar/>

            {isAuthenticated && (
                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            )}

            <main className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/card/:id" element={<CardDetail/>}/>
                    <Route
                        path="/collection"
                        element={
                            <ProtectedRoute>
                                <Collection/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </main>
        </div>
    );
}

export default App;