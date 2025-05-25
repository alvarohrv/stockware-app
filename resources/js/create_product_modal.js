
/** Hay dos url a modificar si se esta en local o produccion */

const productTableBody = document.getElementById('product-table-body');
const form = document.getElementById('create-product-form');
const modalFormC = document.getElementById('idModal');
const sendButton = document.getElementById('send-button');
const contBodyC = document.getElementsByClassName('contBody')[0];


sendButton.addEventListener('click', async function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    console.log("Formulario");

    const formData = new FormData(form);
    const data = {
        nombre: formData.get('name'),
        marca: formData.get('brand'),
        categoria: formData.get('category'),
        presentacion: formData.get('presentation'),
        estado: formData.get('status'),
    };
    console.log(data);

    try {
        //const response = await fetch('/api/create_product.php', {
        const response = await fetch('http://localhost/ProySenaProdv01/api/create_product.php', { //LOCAL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) { // Verifica si la respuesta es exitosa
            console.log('Producto creado correctamente');
            loadProducts(); // Recarga los productos
            form.reset(); // Limpia el formulario
            modalFormC.style.display = 'none'; // Cierra el modal
            contBodyC.style.overflowY = 'auto';
        } else {
            console.error('Error al crear el producto:', response.statusText);
        }

    } catch (error) {
        //console.error('Error:', error);
    }
    // Opcional: Cerrar el modal después de enviar
    document.getElementById('idModalForm').style.display = 'none';
    contBodyC.style.overflowY = 'auto';
});

async function loadProducts() {
    console.log('se ejecuta loadProducts');
    try {
        //const response = await fetch('/api/get_all_product.php');
        const response = await fetch('http://localhost/ProySenaProdv01/api/get_all_product.php'); //LOCAL
        if (response.ok) {
            const productos = await response.json();
            productTableBody.innerHTML = ''; // Limpiar tabla

            productos.forEach(producto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.presentacion}</td>
                    <td>${producto.estado}</td>
                    <td><a href="#" onclick="deleteProduct(${producto.id})">Delete</a></td>
                `;
                productTableBody.appendChild(row);
            });
        } else {
            console.error('Failed to load products');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}