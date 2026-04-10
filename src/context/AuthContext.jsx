import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import noviApi from "../api/noviApi";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [authState, setAuthState] =
        useState({
            user: null,
            status: "pending",
        });

    useEffect(() => {
        const storedUser =
            localStorage.getItem("user");

        const token =
            localStorage.getItem("token");

        if (storedUser && token) {
            setAuthState({
                user: JSON.parse(storedUser),
                status: "done",
            });
        } else {
            setAuthState({
                user: null,
                status: "done",
            });
        }
    }, []);

    async function login(email, password) {
        try {
            const response = await noviApi.post("/api/login", {
                email,
                password,
            });

            localStorage.setItem(
                "token",
                response.data.jwt
            );

            localStorage.setItem(
                "user",
                JSON.stringify({email})
            );

            setAuthState({
                user: { email },
                status: "done",
            });

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

            return true;
        } catch (error) {
            console.error("REGISTER ERROR:", error);

            return false;
        }
    }

    function logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setAuthState({
            user: null,
            status: "done",
        });
    }

    return (
        <AuthContext.Provider
            value={{
                user: authState.user,
                isAuthenticated:
                    !!authState.user,
                login,
                logout,
            }}
        >
            {authState.status === "pending" ? (
                <p>Loading...</p>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}