<?php
// Archivo: controllers/ProductoController.php
require_once '../model/usuario.php';

// controllers/UsuarioController.php

class UsuarioController {


    // Método para verificar credenciales de usuario
    public function login() {

        //session_start();

        $data = json_decode(file_get_contents('php://input'), true);
        $username = $data['username'];
        $password = $data['password'];

        $usuario = new Usuario();
        $usuarioEncontrado = $usuario->findByUsername($username);

        if ($usuarioEncontrado && password_verify($password, $usuarioEncontrado->password)) {
            // Crear token JWT o establecer sesión según la necesidad
            //$_SESSION['user_id'] = $usuarioEncontrado->id;  // Guardar el ID del usuario en la sesión
            //$_SESSION['username'] = $usuarioEncontrado->username;
            echo json_encode(["message" => "Login exitoso"]);
            //var_dump($_SESSION);
            //file_put_contents('session_log_record.txt', print_r($_SESSION, true) . "\n", FILE_APPEND);
            //header('Location: prueba_sesion.php'); // solo se ve en la API porque la web JS paneja la redireccion en este caso

        } else {
            header("HTTP/1.1 401 Unauthorized");
            echo json_encode(["message" => "Credenciales incorrectas"]);
        }
    }

    private function createJWT($userId) {
        // Aquí generarías el JWT y lo devolverías.
        // Esto es solo un ejemplo.
        return base64_encode(json_encode(['user_id' => $userId, 'exp' => time() + 3600]));
    }

    public function createUser() { 
        // Obtener datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['username']) && isset($data['password']) && isset($data['rol']) && isset($data['estado'])) {
            $usuario = new Usuario();

            $usuario->username = $data['username'];
            $usuario->password = $data['password'];
            $usuario->rol = $data['rol'];
            $usuario->estado = $data['estado'];

            if ($usuario->create()) {
                header("HTTP/1.1 201 Created");
                header("Content-Type: application/json");
                echo json_encode(["message" => "Usuario creado exitosamente."]);
            } else {
                header("HTTP/1.1 500 Internal Server Error");
                header("Content-Type: application/json");
                echo json_encode(["message" => "Error al crear el usuario."]);
            }
        } else {
            header("HTTP/1.1 400 Bad Request");
            header("Content-Type: application/json");
            echo json_encode(["message" => "Datos incompletos."]);
        }
    }

    /*

    // Método para crear un nuevo usuario
    public function createUsuario($username, $password, $rol) {
        $usuario = new Usuario();
        $usuario->__set('username', $username);
        $usuario->__set('password', passwordword_hash($password, passwordWORD_DEFAULT));
        $usuario->__set('rol', $rol);
        $usuario->__set('estado', 1); // Usuario activo por defecto

        return $usuario->create();
    }

    // Método para actualizar un usuario existente
    public function updateUsuario($id, $username, $password, $rol, $estado) {
        $usuario = new Usuario();
        $usuario->__set('id', $id);
        $usuario->__set('username', $username);
        if ($password) {
            $usuario->__set('password', password_hash($password, PASSWORD_DEFAULT));
        }
        $usuario->__set('rol', $rol);
        $usuario->__set('estado', $estado);

        return $usuario->update();
    }

    // Método para obtener todos los usuarios
    public function getAllUsuarios() {
        $usuario = new Usuario();
        return $usuario->getAll();
    }

    // Método para eliminar un usuario
    public function deleteUsuario($id) {
        $usuario = new Usuario();
        $usuario->__set('id', $id);
        return $usuario->delete();
    }

    /*/
}