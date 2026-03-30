import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    function handleRegister() {
        navigate("/login");
    }

    return (
        <section>
            <h1>Register</h1>

            <button onClick={handleRegister}>
                Register
            </button>
        </section>
    );
}

export default Register;