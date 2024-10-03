// ./tools/ToolDeleteTrOption.js

//import { ObjetoVenta } from '../objetos/ObjetoVenta.js'; //// La implemetacion pasara el valor, no hacerlo desde aca!!!!!!!!!!
//import {NodoTbody} from '../nodos/nodos.js' /////// para las pruebas unitarias se tuvo que inicializar dentro de la variable //no depende de globales

export function toolDeleteTrOption(id, ObjetoVenta) {
    let NodoTbody = document.querySelector(".tabla-productos table tbody")
    let NodeRowTr = document.querySelector(`#idtr_${id}`);

    // console.log('-------');
    // console.log(NodoTbody);
    // console.log(NodeRowTr);

    if (NodoTbody && NodeRowTr) {
        NodoTbody.removeChild(NodeRowTr);
        const indice = ObjetoVenta.globalPedido.findIndex(objeto => objeto.idProducto === id);
        if (indice !== -1) {
            ObjetoVenta.globalPedido.splice(indice, 1);
        }
    } else {
        console.log(' ;(  Cannot read properties of null // NodoTbody||NodeRowTr');
    }
}