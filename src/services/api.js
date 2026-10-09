const API_URL= "http://127.0.0.1:8000";

export async function loginUser(username, password){
    const response = await fetch(`${API_URL}/api/login`,{
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            username,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Error al iniciar sesion");
    }

    return data;
}

export async function getDashboard(token) {
    const response = await fetch(`${API_URL}/api/dashboard`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "No autorizado");
    }
    return data;
}
