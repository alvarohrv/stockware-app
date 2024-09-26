<?php //3// in: SunnySide\model                       ///Ver4 controller/animal_controller.php


require_once '../core/crud.php';
    //El modelo es el Objeto asbtracto instanciable con metodos y propiedades especificos (como los de update y create con conexion a DB)
    //esta Instacia es la puerta de entrada a la manipulacion de la base de datos


Class Producto extends Crud { //extiende de Crud, por tanto se debe requerir.
    //Los atributos de la clase Producto, tal y como se colocaron en la DB.
    private $id;
    private $nombre;
    private $marca;
    private $categoria;
    private $presentacion;
    private $estado;

    const TABLE = 'producto'; // El nombre de la tabla en la base de datos
    private $pdo; // Variable para compartir la conexión

    public function __construct() {
        parent::__construct(self::TABLE);
        //Se envia el argumento al __constructor de la class-Crud para ser usada en '$this->table=$table;' mediante el construtor de 'Crud'
            // self:: permite llamar la constante dentro de la clase
        //el parent:: en este caso nos evita el tener que instanciar para pasar parametros
        $this->pdo = parent::conexion(); // Instancia la conexión a la base de datos
    }


    //Creando los setter y getter (metodos magicos)
    public function __set($atributo, $value) {
        $this->$atributo = $value;
    }
    public function __get($atributo) { //obtener y enviar datos hacia fuera de la clase, mostrar en pantalla, etc
        return $this->$atributo;
    }
    /*-----------------------------------------------------------*/
    //Aca se desarrolla como tal los metodos create() y update() especifico para cada Objeto.

    // Método para crear un nuevo registro
    public function create() {
        try {
            $stm = $this->pdo->prepare("INSERT INTO " . self::TABLE . " (nombre, marca, categoria, presentacion, estado) VALUES(?,?,?,?,?)");
            //No se coloca el 'id' porque se autoincrementa, eso se especifico al crear la DB.
            //Se indica al registro que va a recibir ciertos datos, en cierto orden, segun como esta en la DB.
            $success = $stm->execute(array($this->nombre, $this->marca, $this->categoria, $this->presentacion, $this->estado));
            
            if ($success) {
                header("HTTP/1.1 200 OK - producto creado");
                header("Content-Type: application/json");
                echo json_encode(["message" => "El producto se creo correctamente."]);
                echo "El producto se creo  correctamente.";
            } else {
                header("HTTP/1.1 500 Internal Server Error - error al intentar crear el producto");
                header("Content-Type: application/json");
                echo json_encode(["message" => "Hubo un error al intentar crear el producto."]);
                echo "Hubo un error al intentar crear el producto.";
            }            
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    // Método para actualizar totalmente un registro existente
    // public function update() { //Actualizar un registro, necesitamos una 'id'
    //     try {
    //         $stm = $this->pdo->prepare("UPDATE " . self::TABLE . " SET nombre=?, marca=?, categoria=?, presentacion=?, estado=? WHERE id=?");
    //         $stm->execute(array($this->nombre, $this->marca, $this->categoria, $this->presentacion, $this->estado, $this->id));
    //     } catch (PDOException $e) {
    //         echo $e->getMessage();
    //     }
    // }

     // Método para actualizar parcialmente un registro   
    Public function update($id) {
        $fields = []; ///$fields se utilizará para almacenar los campos que se desean actualizar.

        if (!empty($this->nombre)) {
            //Si la propiedad 'nombre' del objeto no está vacía (en Controlador lo seteo), se almacena en el array $fields para su actualización
            $fields['nombre'] = $this->nombre;
        }
        if (!empty($this->marca)) {
            $fields['marca'] = $this->marca;
        }
        if (!empty($this->categoria)) {
            $fields['categoria'] = $this->categoria;
        }
        if (!empty($this->presentacion)) {
            $fields['presentacion'] = $this->presentacion;
        }
        if (!empty($this->estado)) {
            $fields['estado'] = $this->estado;
        }

        if (empty($fields)) {
            //Si $fields está vacío (es decir, no se proporcionaron campos para actualizar), se lanza una excepción con un mensaje de error.
            throw new Exception('No se especificaron campos para actualizar.');
        }

        $setClause = [];
        $values = [];

        foreach ($fields as $key => $value) {
            $setClause[] = "$key = ?";
            $values[] = $value;  /// donde $value es un $this->propiedad
        }
        $values[] = $id; //// es lo mismo que array_push($values, $id);

        $sql = "UPDATE " . self::TABLE . " SET " . implode(", ", $setClause) . " WHERE id = ?";
            //El método implode() se utiliza para convertir un array en una cadena de texto, donde los elementos del array se unen mediante un delimitador

        try {
            $stm = $this->pdo->prepare($sql);
            if ($stm->execute($values)) {
                return true;
            } else {
                throw new Exception('Error al ejecutar la consulta de actualización.');
            }
        } catch (PDOException $e) {
            echo json_encode(["message" => "Error de base de datos: " . $e->getMessage()]);
            return false;
        } catch (Exception $e) {
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
            return false;
        }
    }
}



?>

