const API_URL= "http://127.0.0.1:3000";

async function requestJson(url,options={}) {
    const response = await fetch(url,options);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const error = new Error(
            data.detail || "Ocurrió un error al comunicarse con el servidor."
        );

        error.status = response.status;
        throw error;
    }

    return data;
}

export async function loginUser(username, password){
    return requestJson(`${API_URL}/api/login`,{
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            username,
            password
        })
    });
}

export async function getDashboard(token) {
    return requestJson(`${API_URL}/api/dashboard`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
