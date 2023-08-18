document.addEventListener("DOMContentLoaded", () => {
  const NombreSelect = document.getElementById("origen");
  const cedulaSelect = document.getElementById("destino");
  const aseguradoSelect = document.getElementById("fecha-salida");
  const tipoFiltroInput = document.getElementById("tipo-filtro");
  const buscarButton = document.querySelector(".select-button");

  buscarButton.addEventListener("click", () => {
    const nombre = NombreSelect.value;
    const cedula = cedulaSelect.value;
    const asegurado = aseguradoSelect.value;
    const tipoFiltro = tipoFiltroInput.value;

    const urlAPI = `https://localhost:7121/api/Consultas/ConsultarPacientes?nombre=${nombre}&cedula=${cedula}&asegurado=${asegurado}&tipoDeFiltro=${tipoFiltro}`;

    fetch(urlAPI)
      .then(response => {
        if (!response.ok) {
          alert("Error en la solicitud: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        alert(data.message);
        console.log(data);

        NombreSelect.value = '';
        cedulaSelect.value = '';
        aseguradoSelect.value = '';
        tipoFiltroInput.value = '';
  
      })
      .catch((error) => {
        alert("No se pudo completar la acción: " + error.message);
        console.error(error);
      })
  });
});
