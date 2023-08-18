document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
      const submitButton = form.querySelector(".select-button");
      const action = form.getAttribute("data-action");
  
      submitButton.addEventListener("click", event => {
        event.preventDefault(); // Evitar la acción por defecto de enviar el formulario
        handleSubmit(form, action);
      });
    });
  });
  
  
  function handleSubmit(form, action) {
    const submitButton = form.querySelector(".select-button");
    submitButton.disabled = true;
  
    let data = {};
  
    if (action === "insertar") {
      const idPaciente = form.querySelector('input[name="idHotel"]').value;
      const idMedico = form.querySelector('input[name="Nombre"]').value;
      const fechaCitaHora = form.querySelector('input[name="Apellido"]').value;
  
      data = {
        idPaciente: idPaciente || null,
        idMedico: idMedico || null,
        fechaCitaHora: fechaCitaHora || null,
      };
    } else if (action === "actualizar") {
      const idPaciente = form.querySelector('input[name="idPaciente"]').value;
      const idHabitacion = form.querySelector('input[name="idHotel"]').value;
      const fechaInicioInter = form.querySelector('input[name="Nombre"]').value;
  
      data = {
        idPaciente: idPaciente,
        idHabitacion: idHabitacion,
        fechaInicioInter: fechaInicioInter
      };
    } else if (action === "eliminar") {
      const idIngreso = form.querySelector('input[name="idHotel"]').value;
      const fechaSalida = form.querySelector('input[name="Nombre"]').value;
      data = {
        idIngreso: idIngreso || null,
        fechaSalida: fechaSalida || null
      };
    }
  
    let url = "";
    let method = "";
  
    if (action === "insertar") {
      url = "https://localhost:7121/api/Procesos/ReservarCita";
      method = "POST";
    } else if (action === "actualizar") {
      url = "https://localhost:7121/api/Procesos/RegistrarIngreso";
      method = "POST";
    } else if (action === "eliminar") {
      url = `https://localhost:7121/api/Procesos/DarAlta`;
      method = "POST";
    }
  
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        alert("Operación exitosa: " + data.message);
        console.log(data);
  
        form.reset();
      })
      .catch((error) => {
        alert("No se pudo completar la acción: " + error.message);
        console.error(error);
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  }
  