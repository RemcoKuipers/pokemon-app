import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import noviApi from "../api/noviApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] =
        useState(false);

    useEffect(() => {
        const user =
            localStorage.getItem("user");

        if (user) {
            setIsAuthenticated(true);
        }
    }, []);

    async function login(email, password) {
        try {
            console.log("LOGIN START");

            const response = await noviApi.post("/api/login", {
                email,
                password,
            });

            console.log("LOGIN RESPONSE:", response.data);

            localStorage.setItem(
                "token",
                response.data.jwt
            );

            localStorage.setItem(
                "user",
                JSON.stringify({ email })
            );

            setIsAuthenticated(true);

            return true;
        } catch (error) {
            console.error("LOGIN ERROR:", error);
            return false;
        }
    }

    async function register(email, password) {
        try {
            const response = await noviApi.post("/api/users", {
                email,
                password,
                roles: ["user"]
            });

            console.log(
                "REGISTER SUCCESS:",
                response.data
            );

            return true;
        } catch (error) {
            console.error("REGISTER ERROR:", error);

            return false;
        }
    }

    function logout() {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}