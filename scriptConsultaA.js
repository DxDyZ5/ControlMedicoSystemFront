document.addEventListener("DOMContentLoaded", () => {
    const idPacienteSelect = document.getElementById("destino");
    const FechaSelect = document.getElementById("origen");
    const tipoFiltroInput = document.getElementById("tipo-filtro");
    const buscarButton = document.querySelector(".select-button");
  
    buscarButton.addEventListener("click", () => {
        const idPaciente = idPacienteSelect.value;
        const fecha = FechaSelect.value;
        const tipoFiltro = tipoFiltroInput.value;


      if (!fecha) {
        alert("Por favor, establezca la fecha");
        return;
      }
  
      if (!tipoFiltro) {
        alert("Debe especificar el tipo de filtro");
        return;
      }
  
      const urlAPI = `https://localhost:7121/api/Consultas/ConsultarAltasMedicas?idPaciente=${idPaciente}&fecha=${fecha}&tipoDeFiltro=${tipoFiltro}`;
  
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
  
          FechaSelect.value = '';
          idPaciente.value = '';
          tipoFiltroInput.value = '';
    
        })
        .catch((error) => {
          alert("No se pudo completar la acción: " + error.message);
          console.error(error);
        })
    });
  });
  