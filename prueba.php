<?php
// Datos de conexión
$driver = 'mysql';
$host = 'localhost';
$user = 'agrupala_alvaro';
$pass = 'TD}%6wHtg(L?_rpEk?_9u2nt';
$dbName = 'agrupala_stockwareapp_test';
$charset = 'utf8';

try {
    // Construir la cadena DSN (Data Source Name)
    $dsn = "$driver:host=$host;dbname=$dbName;charset=$charset";

    // Crear una instancia de PDO para la conexión
    $pdo = new PDO($dsn, $user, $pass);
    
    // Configurar el modo de error de PDO a excepción
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Hacer una consulta simple
    $stmt = $pdo->query('SELECT NOW()');

    // Obtener y mostrar el resultado
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "Conexión exitosa. Fecha y hora actuales del servidor MySQL: " . $result['NOW()'];

    // También podrías usar var_dump() para ver más detalles
    var_dump($result);

} catch (PDOException $e) {
    // Capturar y mostrar errores
    echo "Error en la conexión: " . $e->getMessage();
    var_dump($e);
}