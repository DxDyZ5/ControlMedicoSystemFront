const apiUrl = "https://localhost:7121/api/Medico/ObtenerMedicos"; 

async function fetchClientes() {
    try {
        const response = await fetch(apiUrl);
        const clientes = await response.json();
        return clientes;
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        return [];
    }
}

function mostrarClientes(clientes) {
    const clientesContainer = document.getElementById("clientes-container");
    clientes.forEach((cliente) => {
        const clienteDiv = document.createElement("div");
        clienteDiv.className = "cliente";
        clienteDiv.innerHTML = `
            <h3>${cliente.nombreMed}</h3>
            <p>Exequatur: ${cliente.exequatur}</p>
            <p>Especialidad: ${cliente.especialidad}</p>
        `;
        clientesContainer.appendChild(clienteDiv);
    });
}

async function init() {
    const clientes = await fetchClientes();
    mostrarClientes(clientes);
}

init();

