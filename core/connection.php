<?php //1//  //ver archivo diplomadoPHP/Conexion.php para mas teoria, pero este es el principal////// Ver2 core/crud.php

/*APIS utilizadas por PHP para coneccion a bases de datos(ej:MySQL)son:
PDO (capa de abstraccion util en varios RDBMS)(por defecto viene para MySQL),
        //print_r(PDO::getAvailableDrivers()); //array{[0]=> mysql} //avilitado
Mysql (obsoleta), 
Mysqli (orientado a objeto, muy especializada)
*/

/* Esta formado por tres clases:
PDO - mantiene la coneccion e instancia la clase PDOstatement
PDO statement - maneja sentencias sql (CRUD)
PDO exeption - manejo de errores
*/
class Connection{  //Creando la coneccion a la DB.
    private $driver='mysql'; //especificar en controlador
    private $host='localhost'; //aca irá la IP del servidor //$server //LocaL: 127.0.0.1
    private $user='root'; //Usuario por defaul de MySQLMyAdmin
    private $pass='';
    private $dbName ='stockwareapp_test';
    private $charset='utf8';

    // private $driver='mysql'; //especificar en controlador
    // private $host='localhost'; //aca irá la IP del servidor //$server //LocaL: 127.0.0.1
    // private $user='agrupala_alvaro'; //Usuario por defaul de MySQLMyAdmin
    // private $pass='TD}Htg(L?_rpEk?_9u2nt';
    // private $dbName ='agrupala_stockwareapp_test';
    // private $charset='utf8';

    protected  function conexion(){ //METODO protegido
        try{  //El 'try-catch' 
            //Creacion de una instancia para crear la comunicacion con el gestor de la DB.
            $pdo=new PDO("{$this->driver}:host={$this->host};dbname={$this->dbName};charset={$this->charset}" ,$this->user, $this->pass);
                //new PDO("mysql:host=localhost; dbname=marvel;charset=utf8", "root","");
            //creando una instancia para poder comunicarnos con el gestor de base de datos.
            //Mediante esta instancia podemos ejecutar sentencias SQL
            //para  el lanzamiento de errores, y otra para las excepciones.
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
             //ATTR_ERRMODE //para el reporte de errores
            //ERRMODE_EXCEPTION //para las excepciones
            //documentacion en PHP.net  pdo.setatteibute.php //atributos para el manejo de las bases de datos
            return $pdo; //Retorna un OBJETO, un Objeto de 'conexion' al gestor a la Base de datos, como todo objeto tendra sus Atributos y Metodos.
            var_dump($pdo);
        }
        catch(PDOException $e){  //chatch atrapara los errores de la clase: PDOException
            // PDOException:, se utiliza para manejar los errores que pueden ocurrir al memento de realizar la coneccion.
            echo $e->getMessage();//imprimiendo el mensaje de error
        }
    }

}


?>

