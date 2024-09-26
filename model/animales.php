<?php //3// in: SunnySide\model                       ///Ver4 controller/animal_controller.php

require_once 'core/crud.php';
    //El modelo es el Objeto asbtracto instanciable con metodos y propiedades especificos (como los de update y create con conexion a DB)
    //esta Instacia es la puerta de entrada a la manipulacion de la base de datos


class Animal extends Crud{ //extiende de Crud, por tanto se debe requerir.
    //Los atributos de la clase animal, tal y como se colocaron en la DB.
    private $id;
    private $name;
    private $specie;
    private $breed;
    private $gender;
    private $color;
    private $age;

    const TABLE='animal'; //El nombre de la tabla, en la DB. Guardada en una CONSTANTE
    private $pdo; //variable para compartir la 'conexion'

    public function __construct(){
        parent::__construct(self::TABLE);
        //Se envia el argumento al __constructor de la class-Crud para ser usada en '$this->table=$table;' mediante el construtor de 'Crud'
            // self:: permite llamar la constante dentro de la clase
        //el parent:: en este caso nos evita el tener que instanciar para pasar parametros
        $this->pdo=parent::conexion(); //Instancia ejecuta un Metodo para la conexion a la Base de Datos, ubicado en connection.php //nota ya estaba definida en el constructor padre.
    }

    //Creando los setter y getter (metodos magicos)
    public function __set($atributo, $value){ //agregar o guardar datos desde un formulario generalmente
        //$name(nombre del atributo) $value (valor para el atributo)
        //Para cuando se crea o actualiza
        $this->$atributo=$value;
    }
    public function __get($atributo){ //obtener y enviar datos hacia fuera de la clase, mostrar en pantalla, etc
        return $this->$atributo;
    }

    /*-----------------------------------------------------------*/
    //Aca se desarrolla como tal los metodos create() y update() especifico para cada Objeto.

    public function create(){ //Crear un nuevo registro, no necesitamos 'id' //ahora seran tipo PUBLIC
        try{
        $stm=$this->pdo->prepare("INSERT INTO " .self::TABLE. " (name, specie, breed,	gender,	color, age) VALUES(?,?,?,?,?,?)");
            //No se coloca el 'id' porque se autoincrementa, eso se especifico al crear la DB.
            //Se indica al registro que va a recibir ciertos datos, en cierto orden, segun como esta en la DB.
            // (name, specie, breed,    gender, color, age) son los atributos de la tabla
            //
        $stm-> execute (array($this->name,$this->specie,$this->breed,$this->gender,$this->color,$this->age));
            //se crean en la base de datos los registros apartir de los atributos del nuevo abjeto (animal)
            //se crea el registro del nuevo objeto en la tabla 'animal'.
        }catch (PDOException $e){
            echo $e->getMessage();
        }
    }
    public function update(){ //Actualizar un registro, necesitamos una 'id' //ahora seran tipo PUBLIC
        try{
        $stm=$this->pdo->prepare("UPDATE ".self::TABLE." SET name=?, specie=?,	breed=?,	gender=?,	color=?, age=? WHERE id=?");
        $stm-> execute (array($this->name,$this->specie,$this->breed,$this->gender,$this->color,$this->age,$this->id));
        }catch (PDOException $e){
        echo $e->getMessage();
        }   
    } 


}



?>

