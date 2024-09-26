
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function fetchProducts() {
    //fetch('./api/get_all_product.php') 
    fetch('http://localhost/ProySenaProdv01/api/get_all_product.php') //LOCAL
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data) {
                populateTable(data);
            } else {
                console.error('Error: No se pudieron cargar los productos.');
            }
        })
        .catch(error => console.error('Error:', error));
}

function populateTable(products) {
    const tableBody = document.getElementById('product-table-body');
    tableBody.innerHTML = ''; // Limpia la tabla existente

    products.forEach(product => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${product.nombre}</td>
            <td>${product.marca}</td>
            <td>${product.categoria}</td>
            <td>${product.presentacion}</td>
            <td>${product.estado}</td>
            <td><a href="#" onclick="deleteProduct(${product.id})">Delete</a></td>
        `;
        
        tableBody.appendChild(row);
    });
}

// function deleteProduct(id) {
//     if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
//         fetch(`./api/delete_product.php?id=${id}`, {
//             method: 'DELETE'
//         })
//         .then(response => response.json())
//         .then(data => {
//             alert(data.message);
//             fetchProducts(); // Vuelve a cargar la tabla después de eliminar
//         })
//         .catch(error => console.error('Error:', error));
//     }
// }