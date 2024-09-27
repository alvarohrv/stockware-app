<?php
/*
//testing
require_once '../core/connection.php';
class TestConnection extends Connection {
    public function test() {
        $pdo = $this->conexion(); // Llamada al método protected
        if ($pdo) {
            echo "Conexión exitosa";
        } else {
            echo "Conexión fallida";
        }
    }
}
// Crear una instancia y probar la conexión
$test = new TestConnection();
$test->test();
*/
require_once '../core/connection.php';

Class FactoriesUsers extends Connection {
    public function insertData() {

        $jsonFile = file_get_contents('usuarios.json');


        $data = json_decode($jsonFile, true);

        $pdo = $this->conexion();

        $sql = "INSERT INTO usuario (username, password, rol, estado) VALUES (:username, :password, :rol, :estado)";
        $stmt = $pdo->prepare($sql);

        foreach ($data as $row) {
            $stmt->execute([
                ':username' => $row['username'],
                ':password' => password_hash($row['password'], PASSWORD_BCRYPT),
                ':rol' => $row['rol'],
                ':estado' => $row['estado']
            ]);
        }

        echo "Datos insertados correctamente";
    }
}

// Prueba de la clase Factories
$factories = new FactoriesUsers();
$factories->insertData();

?>
