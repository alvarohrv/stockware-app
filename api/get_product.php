<?php
//get_product.php
//GET http://localhost:8000/api/get_product.php/?id=7

require_once '../Controllers/ProductoController.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $productoController = new ProductoController();
    $productoController->getProductoById($id);
} else {
    header("HTTP/1.1 400 Bad Request");
    header("Content-Type: application/json");
    echo json_encode(["message" => "Solicitud incorrecta."]);
}