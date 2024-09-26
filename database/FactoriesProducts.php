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

Class FactoriesProducts extends Connection {
    public function insertData() {

        $jsonFile = file_get_contents('productos.json');


        $data = json_decode($jsonFile, true);

        $pdo = $this->conexion();

        $sql = "INSERT INTO producto (nombre, marca, categoria, presentacion, estado) VALUES (:nombre, :marca, :categoria, :presentacion, :estado)";
        $stmt = $pdo->prepare($sql);

        foreach ($data as $row) {
            $stmt->execute([
                ':nombre' => $row['nombre'],
                ':marca' => $row['marca'],
                ':categoria' => $row['categoria'],
                ':presentacion' => $row['presentacion'],
                ':estado' => $row['estado']
            ]);
        }

        echo "Datos insertados correctamente";
    }
}

// Prueba de la clase Factories
$factories = new Factories();
$factories->insertData();

?>
