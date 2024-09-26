function deleteProduct(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {

        //fetch(`./api/delete_product.php?id=${id}`, {
        fetch(`http://localhost/ProySenaProdv01/api/delete_product.php?id=${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // Opcional: recargar la página o eliminar la fila de la tabla
            location.reload();
        })
        .catch(error => console.error('Error:', error));
    }
}