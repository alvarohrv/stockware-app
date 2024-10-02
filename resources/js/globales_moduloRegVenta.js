let  ObjetoVenta = {
    globalPedido: [/*{
        "idProducto": 1,
        "cantidad": 5,
        "precioVenta": 95,
        "subtotal": 100
    },{
        "idProducto": 2,
        "cantidad": 5,
        "precioVenta": 95,
        "subtotal": 100
    }*/],
    cliente: {
        "id": null,
        "nombre": ""
    },
    numeroFactura: "pendiente",
    date: null,
    total: 0,
    abono: 0,
    estado: null,
    descripcion:'',
    AddPedido: function(pedido){
        this.globalPedido.push(pedido);
    }
}

class Pedido {
    constructor(idProducto) {
        this.idProducto = idProducto
        this.cantidad = null;
        this.precioVenta = null;
        this.subtotal = null;
    }
}

export { ObjetoVenta, Pedido };

// export default {
//     ObjetoVenta,
//     Pedido
// };