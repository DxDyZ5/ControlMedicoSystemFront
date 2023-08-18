document.addEventListener("DOMContentLoaded", () => {
    const FechaSelect = document.getElementById("origen");
    const idMedicoSelect = document.getElementById("destino");
    const idPacienteSelect = document.getElementById("destino1");
    const tipoFiltroInput = document.getElementById("tipo-filtro");
    const buscarButton = document.querySelector(".select-button");
  
    buscarButton.addEventListener("click", () => {
      const fecha = FechaSelect.value;
      const idMedico = idMedicoSelect.value;
      const idPaciente = idPacienteSelect.value;
      const tipoFiltro = tipoFiltroInput.value;


      if (!fecha) {
        alert("Por favor, establezca la fecha");
        return;
      }
  
      if (!tipoFiltro) {
        alert("Debe especificar el tipo de filtro");
        return;
      }
  
      const urlAPI = `https://localhost:7121/api/Consultas/ConsultarCitasMedicas?fecha=${fecha}&idMedico=${idMedico}&idPaciente=${idPaciente}&tipoDeFiltro=${tipoFiltro}`;
  
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
          idMedicoSelect.value = '';
          idPacienteSelect.value = '';
          tipoFiltroInput.value = '';
    
        })
        .catch((error) => {
          alert("No se pudo completar la acción: " + error.message);
          console.error(error);
        })
    });
  });
  