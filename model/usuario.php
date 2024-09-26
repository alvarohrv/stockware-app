<?php
//archivo model/usuario.php
require_once '../core/crud.php';

Class Usuario extends Crud { //extiende de Crud, por tanto se debe requerir.
    //Los atributos de la clase Producto, tal y como se colocaron en la DB.
    private $id;
    private $username;
    private $password;
    private $rol;
    private $estado;

    const TABLE = 'usuario'; // El nombre de la tabla en la base de datos
                            //self::CONSTANTE Se utiliza para acceder a una constante definida dentro de la misma clase.
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
    //Metodos personalizados

    public function findByUsername($username) {
        $sql = "SELECT * FROM " . self::TABLE . " WHERE username = ?";
        $stm = $this->pdo->prepare($sql);
        $stm->execute([$username]);

        $result = $stm->fetch(PDO::FETCH_OBJ);

        if ($result) {
            // Mapear los datos del resultado a la instancia actual
            $this->id = $result->id;
            $this->username = $result->username;
            $this->password = $result->password;
            $this->rol = $result->rol;
            $this->estado = $result->estado;
            return $this;
        }
        return null;
    }
    /*-----------------------------------------------------------*/
    //Aca se desarrolla como tal los metodos create() y update() especifico para cada Objeto.

       // Método para crear un nuevo registro
    public function create() {
        $hashedPassword = password_hash($this->password, PASSWORD_BCRYPT);

        $sql = "INSERT INTO " . self::TABLE . " (username, password, rol, estado) VALUES (?, ?, ?, ?)";
        try {
            $stm = $this->pdo->prepare($sql);
            return $stm->execute([$this->username, $hashedPassword, $this->rol, $this->estado]);
        } catch (PDOException $e) {
            echo json_encode(["message" => "Error de base de datos: " . $e->getMessage()]);
            return false;
        }
    }


    public function update($id) { //Actualizar un registro, necesitamos una 'id'
    }
}
?>

