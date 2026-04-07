import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        const success = await login(
            email,
            password
        );

        if (success) {
            navigate("/collection");
        } else {
            setErrorMessage("Incorrect email or password");
        }
    }

    return (
        <section className="auth-page">
            <h1>Login</h1>

            <form
                className="auth-form"
                onSubmit={handleLogin}
            >
                <input
                    type="text"
                    placeholder="Username"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button type="submit">
                    Login
                </button>
                {errorMessage && (
                    <p className="form-message error">
                        {errorMessage}
                    </p>
                )}
            </form>
        </section>
    );
}

export default Login;