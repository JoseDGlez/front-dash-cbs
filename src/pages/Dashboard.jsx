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
        let cancelled = false;

        async function loadDashboard() {
            setLoading(true);
            setError("");

            try {
                const result = await getDashboard(token);
                if (!cancelled) {
                    setData(result);
                }
            } catch (err) {
                if (cancelled) return;

                if (err.status === 401) {
                    logout();
                    navigate("/login", { replace: true });
                    return;
                }

                setError(err.message || "No se pudo cargar el dashboard.");
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        if (!token) {
            logout();
            navigate("/login", { replace: true });
        } else {
            loadDashboard();
        }

        return () => {
            cancelled = true;
        };
    }, [token, logout, navigate]);

    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    if (loading) {
        return <p>Cargando Dashboard...</p>;
    }

    if (error) {
        return (
            <main>
                <h1>No se pudo cargar el Dashboard</h1>
                <p>{error}</p>
                <button onClick={handleLogout}>
                    Volver al inicio de sesión
                </button>
            </main>
        );
    }

    return (
        <main>
            <h1>Bienvenido</h1>
            <p>Usuario: {data?.username}</p>
            <p>{data?.message}</p>
            <p>Usuario autorizado</p>

            <button onClick={handleLogout}>
                Cerrar sesión
            </button>
        </main>
    );


}
