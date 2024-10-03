// ./tools/ToolToogleTrCARGANDO.js

import { ObjetoVenta } from '../objetos/ObjetoVenta.js';
import { NodoTrCARGANDO } from '../nodos/nodos.js';

export function  ToolToogleTrCARGANDO(){
    let ArrayPedidos = ObjetoVenta.globalPedido 

    if(ArrayPedidos.length!=0){
        NodoTrCARGANDO.style.display="none"
    }else{
        NodoTrCARGANDO.style.display="table-row"
    }
}