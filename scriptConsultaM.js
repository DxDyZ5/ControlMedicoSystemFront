document.addEventListener("DOMContentLoaded", () => {
  const TipoSelect = document.getElementById("origen");
  const tipoFiltroInput = document.getElementById("tipo-filtro");
  const buscarButton = document.querySelector(".select-button");

  buscarButton.addEventListener("click", () => {
    const tipo = TipoSelect.value;
    const tipoFiltro = tipoFiltroInput.value;

    const urlAPI = `https://localhost:7121/api/Consultas/ConsultarHabitacion?tipo=${tipo}&tipoDeFiltro=${tipoFiltro}`;

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

        TipoSelect.value = '';
        tipoFiltroInput.value = '';
  
      })
      .catch((error) => {
        alert("No se pudo completar la acción: " + error.message);
        console.error(error);
      })
  });
});
