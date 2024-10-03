
import { toolValidacionCantidadesDigitadas } from '../../resources/js/tools/toolValidacionCantidadesDigitadas';

describe('toolValidacionCantidadesDigitadas', () => {
    let ObjetoVenta;

    beforeEach(() => {
        // Reinicia el estado del ObjetoVenta antes de cada prueba
        ObjetoVenta = {
            globalPedido: []
        };
    });

    it('debería retornar true si todas las cantidades son válidas', () => {
        ObjetoVenta.globalPedido = [
            { idProducto: 1, nombre: "Producto 1", cantidad: 3 },
            { idProducto: 2, nombre: "Producto 2", cantidad: 5 }
        ];

        expect(toolValidacionCantidadesDigitadas(ObjetoVenta)).toBe(true);
    });

    it('debería retornar false si alguna cantidad es 0', () => {
        ObjetoVenta.globalPedido = [
            { idProducto: 1, nombre: "Producto 1", cantidad: 3 },
            { idProducto: 2, nombre: "Producto 2", cantidad: 0 }
        ];

        expect(toolValidacionCantidadesDigitadas(ObjetoVenta)).toBe(false);
    });

    it('debería retornar false si alguna cantidad es null', () => {
        ObjetoVenta.globalPedido = [
            { idProducto: 1, nombre: "Producto 1", cantidad: 3 },
            { idProducto: 2, nombre: "Producto 2", cantidad: null }
        ];

        expect(toolValidacionCantidadesDigitadas(ObjetoVenta)).toBe(false);
    });

    it('debería retornar false si alguna cantidad es undefined', () => {
        ObjetoVenta.globalPedido = [
            { idProducto: 1, nombre: "Producto 1", cantidad: 3 },
            { idProducto: 2, nombre: "Producto 2", cantidad: undefined }
        ];

        expect(toolValidacionCantidadesDigitadas(ObjetoVenta)).toBe(false);
    });
});