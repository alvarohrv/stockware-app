<?php

// Archivo: api/update_producto.php
// PUT: http://localhost:8000/api/update_product.php

require_once '../Controllers/ProductoController.php';

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $productoController = new ProductoController();
    $productoController->updateProduct();
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    header("Content-Type: application/json");
    echo json_encode(["message" => "Método no permitido."]);
}
