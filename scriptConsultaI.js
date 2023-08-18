document.addEventListener("DOMContentLoaded", () => {
    const FechaSelect = document.getElementById("origen");
    const idhabitacionSelect = document.getElementById("destino");
    const tipoFiltroInput = document.getElementById("tipo-filtro");
    const buscarButton = document.querySelector(".select-button");
  
    buscarButton.addEventListener("click", () => {
      const fecha = FechaSelect.value;
      const idhabitacion = idhabitacionSelect.value;
      const tipoFiltro = tipoFiltroInput.value;


      if (!fecha) {
        alert("Por favor, establezca la fecha");
        return;
      }
  
      if (!tipoFiltro) {
        alert("Debe especificar el tipo de filtro");
        return;
      }
  
      const urlAPI = `https://localhost:7121/api/Consultas/ConsultarIngresos?fecha=${fecha}&idHabitacion=${idhabitacion}&tipoDeFiltro=${tipoFiltro}`;
  
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
          idhabitacionSelect.value = '';
          tipoFiltroInput.value = '';
    
        })
        .catch((error) => {
          alert("No se pudo completar la acción: " + error.message);
          console.error(error);
        })
    });
  });
  