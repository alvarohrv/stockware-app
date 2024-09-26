<?php

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

// Archivo: api/create_producto.php
require_once '../Controllers/ProductoController.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $productoController = new ProductoController();
    $productoController->createProducto();
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    header("Content-Type: application/json");
    echo json_encode(["message" => "Método no permitido."]);
}
?>