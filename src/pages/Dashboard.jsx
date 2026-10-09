import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { token, logout } = useAuth();
    const navigate = useNavigate();


    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const result = await getDashboard(token);
                setData(result);
            } catch (err) {
                setError(err.message);

                if (err.message === "Token inválido" ||
                    err.message === "Token expirado" ||
                    err.message === "Not authenticated") {
                    logout();
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, [token, logout, navigate]);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    if (loading) {
        return <p>Cargando Dashboard...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <main>
            <h1>Bienvenido</h1>
            <p>{data?.username}</p>
            <p>{data?.message}</p>
            <p>Usuario autorizado</p>

            <button onClick={handleLogout}>
                Cerrar sesión
            </button>
        </main>
    );


}
