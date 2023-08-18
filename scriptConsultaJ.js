document.addEventListener("DOMContentLoaded", () => {
  const NombreSelect = document.getElementById("origen");
  const especialidadSelect = document.getElementById("destino");
  const tipoFiltroInput = document.getElementById("tipo-filtro");
  const buscarButton = document.querySelector(".select-button");

  buscarButton.addEventListener("click", () => {
    const nombre = NombreSelect.value;
    const especialidad = especialidadSelect.value;
    const tipoFiltro = tipoFiltroInput.value;

    const urlAPI = `https://localhost:7121/api/Consultas/ConsultarMedicos?nombre=${nombre}&especialidad=${especialidad}&tipoDeFiltro=${tipoFiltro}`;

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
        especialidadSelect.value = '';
        tipoFiltroInput.value = '';
  
      })
      .catch((error) => {
        alert("No se pudo completar la acción: " + error.message);
        console.error(error);
      })
  });
});
