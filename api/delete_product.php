<?php
// Archivo: api/delete_product.php

//DELETE http://localhost:8000/api/delete_product.php/?id=6


/* --- PERMISOS PARA XAMP/LOCAL DESDE VSC o web, desactivar este bloque en PRODUCCION ------ */
// Permitir cualquier origen (o especificar un origen en particular si es necesario)
header("Access-Control-Allow-Origin: *");

// Permitir ciertos métodos HTTP (GET, POST, PUT, DELETE, etc.)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// Permitir ciertos encabezados
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 86400"); 
// Manejar solicitud OPTIONS (Preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Retornar solo los encabezados y una respuesta 200 OK
    header("HTTP/1.1 200 OK");
    exit();
}
/** ----------- FIN DE PERMISOS LOCALES ---------------- */

require_once '../Controllers/ProductoController.php';

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {

    // $uri = $_SERVER['REQUEST_URI'];
    // $uriParts = explode('/', $uri); //La URI se divide en partes utilizando explode('/'), lo que convierte la URI en un array.
    // $id = end($uriParts); //se usa para obtener la última parte de la URI, que se asume es el ID.
    // if (is_numeric($id)) {}

    if (isset($_GET['id'])) {
        $productoController = new ProductoController();
        $productoController->deleteProducto($_GET['id']);
    } else {
        header("HTTP/1.1 400 Bad Request");
        header("Content-Type: application/json");
        echo json_encode(["message" => "ID no proporcionado para eliminar el producto."]);
    }
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    header("Content-Type: application/json");
    echo json_encode(["message" => "Método no permitido."]);
}


?>