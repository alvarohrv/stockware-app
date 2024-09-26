<?php //2//             ///Ver3 model/animal.php
    //estrechamente relacionado con connection.php, es quien ejecuta los CRUD y define metodos especificos abstactos

//stm
//$pdo->exec($stringSentenciaSQL) //exec() podria ejecutar sql pero no se usa en este proyecto 
/*
Se usará
prepare() //prepara la sentencia sql
execute() //ejecuta
fetchAll() //retorna datos
fetch() //retorna datos
*/
/*El acronimo CRUD
se refiere a las principales funciones que se implementan en las aplicaciones de base de datos,
 cada letra es el acronimo que se puede asignar a una declaracion SQL estandar*/
require_once 'connection.php';

abstract class Crud extends Connection{ //abstract puesto que no se van a crear instancias de la clase Crud.
                                        //Algunos de sus metodos no son abstractos y se desarrollan en este modulo
    private $table;
    private $pdo;  

    public function __construct($table) {
            //el argumento de este parametro viene desde los archivos de la carpeta (por ejemplo) model/animal.php 
            //Este metodo es de llamado automatico cuando se instancia un objeto!. //__construct() es un metodo magico
        $this->table=$table; //La instancia adopta la variable $table; la compartira con toda la CLASE. Sera la tabla a aplicar CRUD
        $this->pdo=parent::conexion(); //Instancia ejecuta un Metodo para la conexion a la Base de Datos, ubicado en la clase connection.php
                                        //parent:: dado que es un metodo tipo protected
    }
        //https://www.php.net/manual/es/book.pdo.php //Con los tipos de objetos PDO
        //https://www.php.net/manual/es/mysqli.quickstart.prepared-statements.ph

    ////////////////////////////////////////// Metodos generales NO abstractos ////////////////////////////////
    public function getAll(){
            //obtiene todas las intancias de un objetos. (todos los registros que puedan existir en una tablar) (lee todos los rgtrs)
            //Los arroja en forma de array que puede ser 'leido en secuencia' por un foreach.  (ver view/animal.php)
        try{ //prepare - execute - fetch
        $sql= "SELECT * FROM $this->table";
        $stm=$this->pdo->prepare($sql);   //$stm=$this->pdo->prepare("SELECT * FROM $this->table");
                //plantilla de 'sentencia preparada' ó 'parametrisada' soportada por MySQL
                //sentencias PREPARADAS de PDO MySQL para evitar inyeccion de sentencias SQL maliciosos.
            //con el objeto PDO-Conexion tomamos un SubObjeto llamado PDO-Statemente
                //(si no se usa un 'id' se toman los registros(encabezados) de la tabla)
                //$stm se traduce como statement (ó sentencia)
        $stm->execute(); //EJECUTANDO un Metodo del objeto PDO-Statemente
        return $stm->fetchAll(PDO::FETCH_OBJ);
            //Metodo FetchAll nos devuelve cada array(intancia) lleno de los atributo (registros) de un objeto (Ej 'Animal')
            //nos retorna un arreglo con todas las filas de la tabla (registros) [un array de array]
            //en otro ejercicio se guardaren una variable y retornar como 'echo json_encode($resultSet)' a un cliente
            /*PDO::FETCH_OBJ: como parametro permite devuelver un objeto anónimo con nombres de propiedades que se corresponden a los nombres de las columnas devueltas en el conjunto de resultados. https://www.php.net/manual/es/pdostatement.fetch.php */
        } catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    public function getById($id){ //obtiene los datos por ID en forma de objeto
        try{
        $stm=$this->pdo->prepare("SELECT * FROM $this->table WHERE id=?");
                //? //parametros de sustitucion posicional anonimo
            //El uso de '?' no permite cargar solo la informacion por ID especifico; evita colocar directamente el dato id
            //segun la id que se introduzca nos SELECCIONA toda la informacion requerida! nombre,especie,raza... etc!
        $stm->execute(array($id)); //array($id) asocia el parametro con el 'parametros de sustitucion posicionales anonimo'
            //Se estan pasando un array de IDs
        return $stm->fetch(PDO::FETCH_OBJ);
            //Este fetch nos devolvera todos los datos asociados a cada ID (en forma de ObjetoS! y no de arreglo); si fuera un solo objeto seria fetchAll
        } catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    public function delete($id){
        try{
        $stm=$this->pdo->prepare("DELETE FROM $this->table WHERE id=?");
            //segun la id que se introduzca nos BORRARA toda la informacion requerida! nombre,especie,raza... etc!
        $stm->execute(array($id)); //
        } catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    ////////////////////////////////////////// Metodos especificos abstactos ////////////////////////////////

    abstract function create(); //Metodos que por ser abastractos se ejecutan en los objetos que hereden de Class Crud
 //como sus atributos varian segun la instancia, se 'inicializan' aca de abstracta, pero de desarrola para cada instancia
    //no son de aplicacion tan general

    abstract function update($id);  //Metodos que por ser abastractos se ejecutan en los objetos que hereden de Class Crud

}//class Crud



?>

