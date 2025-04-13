
//validacion form 
function validarFormulario() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('detalles');
    const nombreInput = document.getElementById('nombre');
    const telefonoInput = document.getElementById('telefono');
    const modalEnviado = document.getElementById('modal-enviado');

    const errorEmail = document.getElementById('error-email');
    const errorPassword = document.getElementById('error-password');
    const errorNombre = document.getElementById('error-nombre');
    const errorTelefono = document.getElementById('error-telefono');

    // Limpiar mensajes de error previos
    errorEmail.textContent = '';
    errorPassword.textContent = '';
    errorNombre.textContent = '';
    errorTelefono.textContent = '';

    let isValid = true;

    // Validación simulada (puedes agregar validaciones más complejas)
    if (emailInput.value.trim() === '') {
        errorEmail.textContent = 'El email es requerido.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
        errorEmail.textContent = 'El email no tiene un formato válido.';
      isValid = false;
    }

    if (passwordInput.value.trim() === '') {
        errorPassword.textContent = 'detalles son requeridos';
      isValid = false;
    } 

    if (nombreInput.value.trim() === '') {
        errorNombre.textContent = 'El nombre completo es requerido.';
      isValid = false;
    }

    if (telefonoInput.value.trim() === '') {
        errorTelefono.textContent = 'El teléfono es requerido.';
      isValid = false;
    } else if (!/^\d+$/.test(telefonoInput.value)) {
        errorTelefono.textContent = 'El teléfono debe contener solo números.';
      isValid = false;
    }

    if (isValid) {
     
      console.log('Datos enviados ():', {
        email: emailInput.value,
        password: passwordInput.value,
        nombre: nombreInput.value,
        telefono: telefonoInput.value
      });

     
      modalEnviado.style.display = 'block';
      setTimeout(() => {
        modalEnviado.style.display = 'none';
        document.querySelector('form').reset();
      }, 2000); 
    } else {
      console.log('Por favor, revisa los campos.');
   
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    const destacadosItems = document.querySelectorAll('.galeria-destacados .item');
    const audioPlayer = document.getElementById('audio-player');
    const sourceElement = audioPlayer.querySelector('source');

    destacadosItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Evita que el enlace (si lo hay) navegue

            const audioSrc = this.getAttribute('data-audio-src');

            if (audioSrc) {
                sourceElement.src = audioSrc;
                audioPlayer.load(); // Carga la nueva fuente de audio
                audioPlayer.play(); // Reproduce el audio
            }
        });
    });
});