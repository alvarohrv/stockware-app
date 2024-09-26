<?php
// Archivo: api/create_user.php

require_once '../Controllers/UsuarioController.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usuarioController = new UsuarioController();
    $usuarioController->createUser();
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    header("Content-Type: application/json");
    echo json_encode(["message" => "Método no permitido."]);
}
?>