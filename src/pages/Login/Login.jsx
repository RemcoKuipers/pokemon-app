import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleLogin() {
        login();
        navigate("/collection");
    }

    return (
        <section>
            <h1>Login</h1>

            <button onClick={handleLogin}>
                Login
            </button>
        </section>
    );
}

export default Login;