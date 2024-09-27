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

        $jsonFile = file_get_contents('clientes.json');

        $data = json_decode($jsonFile, true);

        $pdo = $this->conexion();

        $sql = "INSERT INTO cliente (nombre, tipo_documento, numero_documento, estado_actor) VALUES (:nombre, :tipo_documento, :numero_documento, :estado_actor)";

    
        $stmt = $pdo->prepare($sql);

        foreach ($data as $row) {
            $stmt->execute([
                ':nombre' => $row['nombre'],
                ':tipo_documento' => $row['tipo_documento'],
                ':numero_documento' => $row['numero_documento'],
                ':estado_actor' => $row['estado_actor'],
            ]);
        }

        echo "Datos insertados correctamente";
    }
}

// Prueba de la clase Factories
$factories = new FactoriesProducts();
$factories->insertData();

?>
