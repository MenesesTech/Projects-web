// Seleccionar elementos DOM necesarios
const cajaCaptcha = document.querySelector(".captch_box input"); // Campo de entrada donde se mostrará el captcha generado
const botonActualizar = document.querySelector(".refresh_button"); // Botón para actualizar el captcha
const cajaEntradaCaptcha = document.querySelector(".captch_input input"); // Campo de entrada para que el usuario ingrese el captcha
const mensaje = document.querySelector(".message"); // Elemento para mostrar el mensaje de validación
const botonEnviar = document.querySelector(".button"); // Botón de envío para validar el captcha ingresado

// Variable para almacenar el captcha generado
let textoCaptcha = null;

// Función para generar el captcha
const generarCaptcha = () => {
  const cadenaAleatoria = Math.random().toString(36).substring(2, 7); // Generar una cadena aleatoria
  const arregloCadenaAleatoria = cadenaAleatoria.split("");
  const cadenaModificada = arregloCadenaAleatoria.map((caracter) =>
    Math.random() > 0.5 ? caracter.toUpperCase() : caracter
  ); // Cambiar aleatoriamente algunos caracteres a mayúsculas
  textoCaptcha = cadenaModificada.join("   "); // Unir los caracteres con espacios para una apariencia espaciada
  cajaCaptcha.value = textoCaptcha; // Mostrar el captcha generado en el campo de entrada
  console.log(textoCaptcha);
};

const clicBotonActualizar = () => {
  generarCaptcha(); // Actualizar el captcha cuando se hace clic en el botón de actualización
  cajaEntradaCaptcha.value = ""; // Borrar el campo de entrada del usuario
  validarCaptchaConTecla();
};

const validarCaptchaConTecla = () => {
  // Alternar la clase "disabled" en el botón de envío según si el campo de entrada del captcha está vacío o no
  botonEnviar.classList.toggle("disabled", !cajaEntradaCaptcha.value);

  if (!cajaEntradaCaptcha.value) mensaje.classList.remove("active"); // Ocultar el mensaje de validación si el campo de entrada del captcha está vacío
};

// Función para validar el captcha ingresado
const clicBotonEnviar = () => {
  textoCaptcha = textoCaptcha
    .split("")
    .filter((caracter) => caracter !== " ")
    .join(""); // Eliminar espacios del captcha almacenado para la validación
  mensaje.classList.add("active"); // Mostrar el mensaje de validación

  // Comprobar si el texto del captcha ingresado es correcto o no
  if (cajaEntradaCaptcha.value === textoCaptcha) {
    mensaje.innerText = "El captcha ingresado es correcto"; // Mostrar mensaje de éxito
    mensaje.style.color = "#222620"; // Color verde oscuro para el mensaje de éxito
  } else {
    mensaje.innerText = "El captcha ingresado no es correcto"; // Mostrar mensaje de error
    mensaje.style.color = "#FF2525"; // Color rojo brillante para el mensaje de error
  }
};

// Agregar oyentes de eventos para el botón de actualización, cajaEntradaCaptcha y botón de envío
botonActualizar.addEventListener("click", clicBotonActualizar);
cajaEntradaCaptcha.addEventListener("keyup", validarCaptchaConTecla);
botonEnviar.addEventListener("click", clicBotonEnviar);

// Generar un captcha cuando la página se carga
generarCaptcha();
