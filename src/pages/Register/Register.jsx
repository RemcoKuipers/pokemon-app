import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Register.css";

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister(e) {
        e.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");

        const success = await register(
            email,
            password
        );

        if (success) {
            setSuccessMessage(
                "Account registered successfully."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } else {
            setErrorMessage(
                "Registration failed."
            );
        }
    }

    return (
        <section className="auth-page">
            <h1>Register</h1>

            <form
                className="auth-form"
                onSubmit={handleRegister}
            >
                <input
                    type="email"
                    placeholder="Email"
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
                    Register
                </button>
                {errorMessage && (
                    <p className="form-message error">
                        {errorMessage}
                    </p>
                )}

                {successMessage && (
                    <p className="form-message success">
                        {successMessage}
                    </p>
                )}
            </form>
        </section>
    );
}

export default Register;