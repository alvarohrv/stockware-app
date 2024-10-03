
// ./tools/ToolToogleTrCARGANDO.js

//// import { ObjetoVenta } from '../objetos/ObjetoVenta.js'; //// SE PASARA POR PARAMETRO
/////// Pues se puede pasar cualquier versión de ObjetoVenta a la función, lo que facilita probar diferentes escenarios sin depender de un import externo. 

export function toolValidacionCantidadesDigitadas(ObjetoVenta) {
    return !(ObjetoVenta.globalPedido.some(obj => obj.cantidad <= 0 || obj.cantidad == null || obj.cantidad == undefined));
}