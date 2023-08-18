const targetUrl = "CRUDH.html";
const targetUrllEFT = "CRUDM.html";

document.addEventListener("keydown", function(event){
  if (event.key === "ArrowRight"){
    window.location.href = targetUrl;
  }else if(event.key === "ArrowLeft"){
    window.location.href = targetUrllEFT;
  }
});



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
    const cedula = form.querySelector('input[name="idHotel"]').value;
    const nombre = form.querySelector('input[name="Nombre"]').value;
    const aseguradoSelect  = form.querySelector('select[name="formato"]');
    const asegurado = aseguradoSelect.value === "true";
    data = {
      cedula: cedula || null,
      nombrePac: nombre || null,
      asegurado: asegurado,
    };

  } else if (action === "actualizar") {
    const idPaciente = form.querySelector('input[name="idPaciente"]').value;
    const cedula = form.querySelector('input[name="idHotel"]').value;
    const nombre = form.querySelector('input[name="Nombre"]').value;
    const aseguradoSelect  = form.querySelector('select[name="formato"]');
    const asegurado = aseguradoSelect.value === "true";
    
    data = {
      idPaciente: idPaciente,
      cedula: cedula,
      nombrePac: nombre,
      asegurado: asegurado,
    };
  } else if (action === "eliminar") {
    const idPaciente = form.querySelector('input[name="idHotel"]').value;
    data = {
      idPaciente: idPaciente || null,
    };
  }

  let url = "";
  let method = "";

  if (action === "insertar") {
    url = "https://localhost:7121/api/Paciente/InsertarPaciente";
    method = "POST";
  } else if (action === "actualizar") {
    url = "https://localhost:7121/api/Paciente/ActualizarPaciente";
    method = "PUT";
  } else if (action === "eliminar") {
    url = `https://localhost:7121/api/Paciente/EliminarPaciente?idPaciente=${data.idPaciente}`;
    method = "DELETE";
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
