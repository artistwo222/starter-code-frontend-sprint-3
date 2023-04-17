
//Función que valida los campos de un formulario.
//Retorna 'true' si no hay errores de validación, 'false' en caso contrario.

function validate() {
	// Variable para llevar cuenta de los errores de validación
	var error = 0;

	// Obtener los campos del formulario
	var fName = document.getElementById("fName");
	var fLastN = document.getElementById("fLastN");
	var fEmail = document.getElementById("fEmail");
	var fAddress = document.getElementById("fAddress");
	var fPassword = document.getElementById("fPassword");
	var fPhone = document.getElementById("fPhone");
	var fSubmit = document.getElementById("formS");

	// Validar los campos ingresados por el usuario: nombre, teléfono, contraseña y correo electrónico
	if (fName.value == "" || fName.value.length < 3 || /^\s+$/.test(fName)) {
		fName.classList.add("is-invalid"); // Agregar clase "is-invalid" para mostrar el mensaje de error
		error++;
	} else {
		fName.classList.remove("is-invalid"); // Remover la clase "is-invalid" si el campo es válido
		fName.classList.add("is-valid"); // Agregar la clase "is-valid" para mostrar que el campo es válido
	}

	if (fEmail.value == "" || fEmail.value.length < 3 || !/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/) {
		fEmail.classList.add("is-invalid");
		error++;
	} else {
		fEmail.classList.remove("is-invalid");
		fEmail.classList.add("is-valid");
	}

	if (fLastN.value == "" || fLastN.value.length < 3 || /^\s+$/.test(fLastN)) {
		fLastN.classList.add("is-invalid");
		error++;
	} else {
		fLastN.classList.remove("is-invalid");
		fLastN.classList.add("is-valid");
	}

	if (fAddress.value == "" || fAddress.value.length < 3) {
		fAddress.classList.add("is-invalid");
		error++;
	} else {
		fAddress.classList.remove("is-invalid");
		fAddress.classList.add("is-valid");
	}

	if (fPassword.value == "" || fPassword.value.length < 3 || !fPassword.value.match(/^(?=.[0-9])(?=.[a-zA-Z])[a-zA-Z0-9]{3,8}$/)) {
		fPassword.classList.add("is-invalid");
		error++;
	} else {
		fPassword.classList.remove("is-invalid");
		fPassword.classList.add("is-valid");
	}

	if (fPhone.value == "" || fPhone.value.length != 9 || isNaN(fPhone.value)) {
		fPhone.classList.add("is-invalid");
		error++;
	} else {
		fPhone.classList.remove("is-invalid");
		fPhone.classList.add("is-valid");
	}

	// Si hay errores de validación, se previene el envío del formulario y se muestra un mensaje de error
	if (error > 0) {
		fSubmit.addEventListener("submit", event => {
			event.preventDefault(); // Prevenir el envío del formulario
		}, true);
		alert("Error");
		return false;
	} else {
		alert("OK");
		return true;
	}
}