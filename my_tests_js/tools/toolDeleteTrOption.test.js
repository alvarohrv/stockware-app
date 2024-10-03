
import { toolDeleteTrOption } from '../../resources/js/tools/toolDeleteTrOption.js';

let ObjetoVenta;


describe('ToolDeleteTrOption', () => {

    beforeEach(() => {
        // Simulación del nodo NodoTbody
        document.body.innerHTML = `  
            <div class="tabla-productos">
                <table>
                    <tbody id="tbody">
                        <tr id="idtr_1"><td>Producto 1</td></tr>
                        <tr id="idtr_2"><td>Producto 2</td></tr>
                        <tr id="idtr_3"><td>Producto 3</td></tr>
                    </tbody>
                </table>
            </div>
        `;

        // Resetear ObjetoVenta antes de cada prueba
        ObjetoVenta = {
            globalPedido: [
                { idProducto: 1, nombre: "Producto 1" },
                { idProducto: 2, nombre: "Producto 2" },
                { idProducto: 3, nombre: "Producto 3" }
            ]
        };
    });

    it('debería eliminar la fila del DOM y el objeto del array', () => {

        // Comprobar que el nodo existe antes de eliminar
        expect(document.querySelector('#idtr_2')).not.toBeNull();
        // Comprobar que el objeto dentro del array existe antes de eliminar
        expect(ObjetoVenta.globalPedido.length).toBe(3);

        // Llamar a la función
        toolDeleteTrOption(2, ObjetoVenta);

        // Verificar que la fila se eliminó del DOM
        expect(document.querySelector('#idtr_2')).toBeNull();

        // Verificar que el producto se eliminó del array globalPedido
        expect(ObjetoVenta.globalPedido.length).toBe(2);
        expect(ObjetoVenta.globalPedido.find(obj => obj.idProducto === 2)).toBeUndefined();
    });
});


// function ToolDeleteTrOption(id, ObjetoVenta) {
//     let NodoTbody = document.querySelector(".tabla-productos table tbody")
//     let NodeRowTr = document.querySelector(`#idtr_${id}`);

//     // console.log('-------');
//     // console.log(NodoTbody);
//     // console.log(NodeRowTr);

//     if (NodoTbody && NodeRowTr) {
//         NodoTbody.removeChild(NodeRowTr);
//         const indice = ObjetoVenta.globalPedido.findIndex(objeto => objeto.idProducto === id);
//         if (indice !== -1) {
//             ObjetoVenta.globalPedido.splice(indice, 1);
//         }
//     } else {
//         console.log(' ;(  Cannot read properties of null // NodoTbody||NodeRowTr');
//     }
// }