const modalForm = document.getElementById('idModal');
const contBody = document.getElementsByClassName('contBody')[0];

const toggleBtnCreate = document.querySelector('.toggle-btn-modal');
const closeModalBtn = document.getElementById('close-modal-button');


// Agrega un evento de clic al botón para mostrar el modal
toggleBtnCreate.addEventListener('click', function() {
    modalForm.style.display = 'flex'; // Muestra el modal
    contBody.style.overflowY = 'hidden';
});

// Agrega un evento de clic al botón de cerrar para ocultar el modal
closeModalBtn.addEventListener('click', function() {
    modalForm.style.display = 'none'; // Oculta el modal
    contBody.style.overflowY = 'auto';
});

// Cerrar el modal si se hace clic fuera de la caja del formulario
window.addEventListener('click', function(event) {
    if (event.target == modalForm) {
        modalForm.style.display = 'none';
        contBody.style.overflowY = 'auto';
    }
});
