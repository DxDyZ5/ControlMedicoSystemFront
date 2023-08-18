const slideButtonlEFT = document.getElementById("SlideLeft-button")
const targetUrllEFT = "CRUDP.html";

document.addEventListener("keydown", function(event){
  if (event.key === "ArrowLeft"){
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
    const numero = form.querySelector('input[name="idHotel"]').value;
    const tipo  = form.querySelector('select[name="formato"]').value;
    const precioPorDia = form.querySelector('input[name="Nombre"]').value;
    data = {
      numero: numero || null,
      tipo: tipo || null,
      precioPorDia: precioPorDia || null
    };

  } else if (action === "actualizar") {
    const idHabitacion = form.querySelector('input[name="idHabitacion"]').value;
    const numero = form.querySelector('input[name="idHotel"]').value;
    const tipo  = form.querySelector('select[name="formato"]').value;
    const precioPorDia = form.querySelector('input[name="Nombre"]').value;
    
    data = {
      idHabitacion: idHabitacion,
      numero: numero,
      tipo: tipo,
      precioPorDia: precioPorDia
    };
  } else if (action === "eliminar") {
    const idHabitacion = form.querySelector('input[name="idHotel"]').value;
    data = {
      idHabitacion: idHabitacion || null,
    };
  }

  let url = "";
  let method = "";

  if (action === "insertar") {
    url = "https://localhost:7121/api/Habitacion/InsertHabitaciones";
    method = "POST";
  } else if (action === "actualizar") {
    url = "https://localhost:7121/api/Habitacion/ActualizarHabitaciones";
    method = "PUT";
  } else if (action === "eliminar") {
    url = `https://localhost:7121/api/Habitacion/Eliminarhabitacion?idHabitacion=${data.idHabitacion}`;
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
