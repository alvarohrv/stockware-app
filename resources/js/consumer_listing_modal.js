import { ObjetoVenta } from './objetos/ObjetoVenta.js';

const modalForm = document.getElementById('idModal');
const contBody = document.getElementsByClassName('contBody')[0];
const btnModal = document.getElementsByClassName('toggle-btn-modal')[0];
const sendButton = document.getElementById('send-button');
const nameCostumer = document.getElementById('nombreCliente');
const tableBody = document.getElementById('table-body');
let selectedCostumer = null; // Variable para almacenar el cliente seleccionado



// Al abrir el modal
btnModal.addEventListener('click', function (event) {
    sendButton.style.backgroundColor="var(--color-of-links)"
    loadCostumers();
    //listenerCheckbox();  // Escucha el evento de selección del checkbox //llevado al loadCostumer()
    listenerClickSendButton(); // Escucha el click en el botón send
});


async function loadCostumers() {
    //console.log('Se ejecuta loadCostumers');
    try {
        const response = await fetch('http://localhost/ProySenaProdv01/api/get_all_costum.php'); // LOCAL
        if (response.ok) {
            const costumers = await response.json();
            tableBody.innerHTML = ''; // Limpiar tabla

            // Llenar la tabla con los clientes
            costumers.forEach(costum => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><input type="checkbox" name="costumer" value="${costum.nombre}" id="${costum.id}"></td>
                    <td>${costum.nombre}</td>
                    <td>${costum.numero_documento}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            console.error('Failed to load products');
        }
    } catch (error) {
        console.error('Error:', error);
    }
    listenerCheckbox()
    //console.log('FIN loadCostumers');
}

// Escucha si un checkbox es seleccionado
function listenerCheckbox() {
    //console.log('Se ejecuta listenerCheckbox');
    const checkboxes = document.querySelectorAll('input[name="costumer"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                //sendButton.style.backgroundColor="var(--color-create);" //No funciono ???
                sendButton.style = '';
                let selectedCheckboxId = checkbox.id //// sera solo una valor numerico
                console.log('checked '+selectedCheckboxId)
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox.id !== selectedCheckboxId) {
                      otherCheckbox.checked = false;
                    }
                  });
                // Si se selecciona un checkbox, habilitar el botón y guardar el cliente
                selectedCostumer = checkbox.value; // Guardar el nombre del cliente seleccionado
                ObjetoVenta.cliente.nombre=selectedCostumer
                ObjetoVenta.cliente.id=Number(selectedCheckboxId) 
                //console.log('selectedCostumer '+selectedCostumer);

            } else {
                //console.log('NO checked')
                // Si no hay ninguno seleccionado, deshabilitar el botón
                sendButton.style.backgroundColor="var(--color-of-links)"
                selectedCostumer = null;
            }
        });
    });
}

// Escucha el clic en el botón "Send"
function listenerClickSendButton() {
    sendButton.addEventListener('click', function () {
        if (selectedCostumer) {
            nameCostumer.innerHTML = selectedCostumer; // Actualizar el nombre del cliente en el HTML
            
        } else {
            console.error('No customer selected');
        }
        modalForm.style.display = 'none'; // Oculta el modal
        contBody.style.overflowY = 'auto';
    });
}