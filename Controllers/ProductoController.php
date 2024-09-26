<?php
// Archivo: controllers/ProductoController.php

require_once '../model/producto.php';


class ProductoController {

   // Método para obtener todos los productos
    public function getAllProductos() {
        $producto = new Producto();
        $productos = $producto->getAll();

        if ($productos) {
            header("HTTP/1.1 200 OK / Lista de registros");
            header("Content-Type: application/json");
            echo json_encode($productos);
        } else {
            header("HTTP/1.1 404 Not Found");
            header("Content-Type: application/json");
            echo json_encode(["message" => "No se encontraron productos."]);
        }
    }

    // Método para obtener un producto por ID
    public function getProductoById($id) {
        try {
            $producto = new Producto();
            $productoData = $producto->getById($id); // Llama al método getById del modelo Producto

            if ($productoData) {
                header("HTTP/1.1 200 OK");
                header("Content-Type: application/json");
                echo json_encode($productoData);
                // echo json_encode(["message" => "Producto  encontrado."]);
            } else {
                header("HTTP/1.1 404 Not Found");
                header("Content-Type: application/json");
                echo json_encode(["message" => "Producto no encontrado."]);
            }
        } catch (Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            header("Content-Type: application/json");
            echo json_encode(["message" => $e->getMessage()]);
        }
    }

    // Método para crear
    public function createProducto() {
        // Obtener los datos enviados por POST
        $data = json_decode(file_get_contents('php://input'), true);

        //json_decode() convierte en un objeto, 
        
        if (isset($data['nombre'], $data['marca'], $data['categoria'], $data['presentacion'], $data['estado'])) { //isset() evalua que sea != de NULL
            $producto = new Producto();
            
            // Asignar los valores al modelo
            $producto->__set('nombre', $data['nombre']);
            $producto->__set('marca', $data['marca']);
            $producto->__set('categoria', $data['categoria']);
            $producto->__set('presentacion', $data['presentacion']);
            $producto->__set('estado', $data['estado']);
            
            // Crear el producto
            $producto->create(); // se usar los metodos magicos de setter, no se envia por el constructor
        } else {
            header("HTTP/1.1 400 Bad Request");
            header("Content-Type: application/json");
            echo json_encode(["message" => "Datos incompletos para crear el producto."]);
        }
    }

    // Método para borrar
    public function deleteProducto($id) {
        $producto = new Producto();
        $productData = $producto->getById($id); //// recordar que el modelo extiende de la clase Crud
        
        if ($productData) {
            $producto->delete($id);  //// recordar que el modelo extiende de la clase Crud
            header("HTTP/1.1 200 OK");
            header("Content-Type: application/json");
            echo json_encode(["message" => "El producto se eliminó correctamente."]);
        } else {
            header("HTTP/1.1 404 Not Found");
            header("Content-Type: application/json");
            echo json_encode(["message" => "Producto no encontrado."]);
        }
    }


// Método para actualizar un producto
    public function updateProduct() {
   // Obtener los datos enviados por PUT
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar si se ha proporcionado el ID
    if (isset($data['id'])) {
        $producto = new Producto(); // es una instancia, sus propiedades estan vacias

        // Asignar los valores a los campos del modelo
        if (isset($data['nombre'])) {  // Si no es null, asignar un nuevo valor a la propiedad 'nombre' del objeto $producto 

            $producto->__set('nombre', $data['nombre']);
        }
        if (isset($data['marca'])) {
            $producto->__set('marca', $data['marca']);
        }
        if (isset($data['categoria'])) {
            $producto->__set('categoria', $data['categoria']);
        }
        if (isset($data['presentacion'])) {
            $producto->__set('presentacion', $data['presentacion']);
        }
        if (isset($data['estado'])) {
            $producto->__set('estado', $data['estado']);
        }

        // Establecer el ID del producto a actualizar
        $producto->__set('id', $data['id']);

        // Actualizar el producto
        if ($producto->update($data['id'])) {
            header("HTTP/1.1 200 OK");
            header("Content-Type: application/json");
            echo json_encode(["message" => "El producto se actualizó correctamente."]);
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            header("Content-Type: application/json");
            echo json_encode(["message" => "Hubo un error al intentar actualizar el producto."]);
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
        header("Content-Type: application/json");
        echo json_encode(["message" => "ID del producto no proporcionado."]);
    }
    }


}
?>