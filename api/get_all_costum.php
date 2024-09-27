<?php

/* --- PERMISOS PARA XAMP/LOCAL DESDE VSC o web, desactivar este bloque en PRODUCCION --------- */
// Permitir cualquier origen (o especificar un origen en particular si es necesario)
header("Access-Control-Allow-Origin: *");

// Permitir ciertos métodos HTTP (GET, POST, PUT, DELETE, etc.)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// Permitir ciertos encabezados
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 86400"); 
/** ----------- FIN DE PERMISOS LOCALES ---------------- */


//get_all_product.php
require_once '../Controllers/ClienteController.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $clienteController = new ClienteController();
    $clienteController->getAllClientes();
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    header("Content-Type: application/json");
    echo json_encode(["message" => "Método no permitido."]);
}