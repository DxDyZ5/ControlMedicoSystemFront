const slideButton = document.getElementById("Slide-button")
const targetUrl = "CRUDP.html";

document.addEventListener("keydown", function(event){
  if (event.key === "ArrowRight"){
    window.location.href = targetUrl;

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
    const nombre = form.querySelector('input[name="idHotel"]').value;
    const exequatur = form.querySelector('input[name="Nombre"]').value;
    const especialidad = form.querySelector('input[name="Apellido"]').value;

    data = {
      nombreMed: nombre || null,
      exequatur: exequatur || null,
      especialidad: especialidad || null,
    };
  } else if (action === "actualizar") {
    const idMedico = form.querySelector('input[name="idMedico"]').value;
    const nombre = form.querySelector('input[name="idHotel"]').value;
    const exequatur = form.querySelector('input[name="Nombre"]').value;
    const especialidad = form.querySelector('input[name="Apellido"]').value;

    data = {
      idMedico: idMedico,
      nombreMed: nombre,
      exequatur: exequatur,
      especialidad: especialidad,
    };
  } else if (action === "eliminar") {
    const idMedico = form.querySelector('input[name="idHotel"]').value;
    data = {
      idMedico: idMedico || null,
    };
  }

  let url = "";
  let method = "";

  if (action === "insertar") {
    url = "https://localhost:7121/api/Medico/InsertarMedicos";
    method = "POST";
  } else if (action === "actualizar") {
    url = "https://localhost:7121/api/Medico/ActualizaMedicos";
    method = "PUT";
  } else if (action === "eliminar") {
    url = `https://localhost:7121/api/Medico/EliminarMedicos?idMedico=${data.idMedico}`;
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
