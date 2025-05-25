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

// Función para cargar variables del archivo .env
function loadMyEnv($path) {
    if (!file_exists($path)) return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    /* 
    FILE_IGNORE_NEW_LINES → no agrega \n al final de cada línea.
    FILE_SKIP_EMPTY_LINES → salta líneas vacías.
    */
    foreach ($lines as $line) {

        if (strpos(trim($line), '#') === 0 || strpos(trim($line), '//') === 0) continue;
        // Si la línea comienza con # o //, se ignora.

        $arrayClaveValor = array_map('trim', explode('=', $line, 2));
          //array_map('trim', ...) → elimina espacios en blanco al principio y al final
        //explode('=', $line, 2) → divide la línea en máximo dos partes.
        //  divide la línea en dos partes: nombre y valor.
        list($name, $value) = $arrayClaveValor;
        //list() → asigna los valores del array a las variables $name y $value. //similar a un destructuring en JS.
        putenv("$name=$value");
        //$_ENV[$name] = $value; // array global $_ENV, que es una variable superglobal en PHP. //no se logra su uso porque no se encuentra habilitada en el archivo php.ini para habilitarlo se debe modificar la variable order=EGPCS (pendiente)

    }
}

loadMyEnv(__DIR__ . '/../.env');

// var_dump(getenv('DB_DRIVER'), getenv('DB_HOST'), getenv('DB_USER'), getenv('DB_PASS'), getenv('DB_NAME'), getenv('DB_CHARSET'));

class Connection{  //Creando la coneccion a la DB.

    ///// las primeras formas de definir las variables de entorno
    // private $driver='mysql'; //especificar en controlador
    // private $host='localhost'; //aca irá la IP del servidor //$server //LocaL: 127.0.0.1
    // private $user='root'; //Usuario por defaul de MySQLMyAdmin
    // private $pass='';
    // private $dbName ='stockwareapp_test';
    // private $charset='utf8';

    private $driver;
    private $host;
    private $user;
    private $pass;
    private $dbName;
    private $charset;

    public function __construct() {
        $this->driver = getenv('DB_DRIVER') ?: 'mysql';
        $this->host = getenv('DB_HOST') ?: 'localhost';
        $this->user = getenv('DB_USER') ?: 'root';
        $this->pass = getenv('DB_PASS') ?: '';
        $this->dbName = getenv('DB_NAME') ?: 'stockwareapp_test';
        $this->charset = getenv('DB_CHARSET') ?: 'utf8';

        // $this->driver = $_ENV['DB_DRIVER'] ?? 'mysql';
        // $this->host = $_ENV['DB_HOST'] ?? 'localhost';
        // $this->user = $_ENV['DB_USER'] ?? 'root';
        // $this->pass = $_ENV['DB_PASS'] ?? '';
        // $this->dbName = $_ENV['DB_NAME'] ?? '';
        // $this->charset = $_ENV['DB_CHARSET'] ?? 'utf8';
        ///...Edita tu archivo php.ini -> variables_order = "EGPCS"

    }

       // private $driver='mysql'; //especificar en controlador
    // private $host='localhost'; //aca irá la IP del servidor //$server //LocaL: 127.0.0.1
    // private $user='prefijodeseguridad_alvarex'; //Usuario por defaul de MySQLMyAdmin
    // private $pass='ZD}Hxyxyxiunombrexioxoiuyxuiyxu2nt';
    // private $dbName ='prefijodeseguridad_stockwareapp_test';
    // private $charset='utf8';
    /////////////// SE CREA .gitignore PARA NO SUBIR A GITHUB EL ARCHIVO DE CONEXION de produccion y el archivo de variables de entorno .env


    protected  function conexion(){ //METODO protegido
        // var_dump($this->driver, $this->host, $this->user, $this->pass, $this->dbName, $this->charset);

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

