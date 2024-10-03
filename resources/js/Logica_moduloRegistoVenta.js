import { ObjetoVenta } from './objetos/ObjetoVenta.js';
import { Pedido } from './objetos/Pedido.js';
import {ToolToogleTrCARGANDO} from './tools/ToolToogleTrCARGANDO.js'
import {toolValidacionCantidadesDigitadas} from './tools/toolValidacionCantidadesDigitadas.js'
import {toolDeleteTrOption} from './tools/toolDeleteTrOption.js'
import {selectNodoCategory,selectNodoBrand,selectNodoProduct,
NodoBottomAddProduct,NodoTbody ,NodoTotalPagar,
NodoBottomSalesRegister,NodoInputAbono,NodoTextDescripcion,
NodoNameCostumer,NodoInputEstado} from './nodos/nodos.js'

document.addEventListener('DOMContentLoaded', () => {
//// IMPORTANTE se omite la primera Identacion!!!!!!!!!!!!!!!!!!

let dataglobal = []
let globalFilteredProductsCatg = []
let globalFilteredProductsMarc = []
let globalCategoriesArray = [];


fetch('http://localhost/ProySenaProdv01/api/get_all_product.php')
    .then(response => response.json())
    .then(data => {
    dataglobal = data; /// llevarla a global

    // Iterar sobre los productos y agregar las categorías al array
    //evita duplicados, se podria usar Set()
    data.forEach(product => {
    if (!globalCategoriesArray.includes(product.categoria)) {
        globalCategoriesArray.push(product.categoria);
    }
    });

// Limpiar el select y agregar las nuevas opciones

    fnResetSelect(selectNodoCategory, 'Categoria')

    fnGenerarListaCategorias()

    fnListenerAndLoadDeSelectBrand()
    fnListenerAndLoadDeSelectProduct()

    fnListenerClickAdd_Reset_validation(fnAddRecordAndFeatures)

    fnListenerClickSale_Reset_validation()
    
})
.catch(error => console.error('Error:', error));

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function fnGenerarListaCategorias(){
    globalCategoriesArray.forEach(category => {
        const optionElement = document.createElement('option');
        optionElement.value = category;
        optionElement.textContent = category; 
        selectNodoCategory.appendChild(optionElement); 
    });
}

function fnListenerAndLoadDeSelectBrand(){
    selectNodoCategory.addEventListener('change', () => {

        if((selectNodoCategory.value)=="Categoria"){
            fnResetSelect(selectNodoBrand, 'Marca')
            fnResetSelect(selectNodoProduct, 'Producto')
        }
        else{

            globalFilteredProductsCatg  = dataglobal.filter(product => product.categoria === (selectNodoCategory.value));
        
            // Obtener las marcas únicas de los productos filtrados
            let uniqueBrands = new Set(globalFilteredProductsCatg .map(product => product.marca));
        
            // Limpiar el select de marcas y agregar las nuevas opciones
        
            // Agregar una opción por defecto (opcional)
            fnResetSelect(selectNodoBrand, 'Marca')
            fnResetSelect(selectNodoProduct, 'Producto')

            uniqueBrands.forEach(brand => {
                const optionElement = document.createElement('option');
                optionElement.value = brand;
                optionElement.textContent = brand;
                selectNodoBrand.appendChild(optionElement);
            });

        }
    });
}

function fnListenerAndLoadDeSelectProduct(){
    
    selectNodoBrand.addEventListener('change', () => {

        
        if((selectNodoBrand.value)=="Marca") fnResetSelect(selectNodoProduct, 'Producto')
        else{

            globalFilteredProductsMarc = globalFilteredProductsCatg.filter(product => product.marca === (selectNodoBrand.value));
            // console.log(globalFilteredProductsCatg)
            // console.log(globalFilteredProductsMarc)

            // Obtener las marcas únicas de los productos filtrados
            const uniquePresent = new Set(globalFilteredProductsMarc.map(product => product.presentacion));
        
            // Limpiar el select de marcas y agregar las nuevas opciones
            fnResetSelect(selectNodoProduct, 'Producto')

            uniquePresent.forEach(presnt => {
                const optionElement = document.createElement('option');
                optionElement.value = presnt;
                optionElement.textContent = presnt;
                selectNodoProduct.appendChild(optionElement);
            });
        }
    });
}

function fnListenerClickAdd_Reset_validation(callback_add){  //
    NodoBottomAddProduct.addEventListener('click', () => {

        ///VALIDACION DE OPCIONES SELECCIONADAS

        if(selectNodoCategory.value!="Categoria" && selectNodoCategory.value!=undefined){
            if(selectNodoBrand.value!="Marca" && selectNodoBrand.value!=undefined){ 
                if(selectNodoProduct.value!="Producto" && selectNodoProduct.value!=undefined){
                    let filteredProductSelect = globalFilteredProductsMarc.filter(product => product.presentacion === selectNodoProduct.value);
                    callback_add(filteredProductSelect[0])
                    fnResetAndLoadCatogory()
                    fnResetSelect(selectNodoBrand, 'Marca')
                    fnResetSelect(selectNodoProduct, 'Producto')
                    //console.log('_Logica de agregado_')

                }else{
                    alert("Selecciona Producto")  
                }
            }else{
                alert("Selecciona Marca")             
            }
        }
        else{
            alert("Selecciona Categoria")
        }

    })
}


function fnResetAndLoadCatogory(){
    selectNodoCategory.innerHTML = `<option value='Categoria'>Categoria</option>`
    globalCategoriesArray.forEach(category => {
        const optionElement = document.createElement('option');
        optionElement.value = category;
        optionElement.textContent = category; 
        selectNodoCategory.appendChild(optionElement); 
        });        
}


function fnResetSelect(nodo, value){
    //selectNodoCategory.innerHTML = '<option value="Categoria">Categoria</option>'
    nodo.innerHTML = `<option value="${value}">${value}</option>`
}
    


function fnAddRecordAndFeatures(producto){ //
    // console.log('fnAddRecordAndFeatures')
    // console.log(producto)
    // console.log(producto.marca)
    // console.log(producto.presentacion)
    // console.log(producto.estado)

    if(producto.estado=="Disponible"){
        if(!(ObjetoVenta.globalPedido.some(obj => obj.idProducto == producto.id))){

            let template =`<td class="deleteProduct" id="idbtndlt_${producto.id}">X</td>
            <td>${producto.categoria}</td>
            <td>${producto.marca}</td><td>${producto.presentacion}</td>
            <td>
                <div style="display: flex;">
                    <input type="number"
                        class="inputCantidad"
                        name="cantidad"
                        id="idInputCantidad_${producto.id}"
                        placeholder="${producto.cantidad} en stock">
                    <span id="idspan_${producto.id}" > &#9888 </span>
                </div>
            </td>
            <td class="subtotal" id="idsubtotal_${producto.id}"> $0.00 </td>`

            //
            //<input type="number" class="inputCantidad" name="cantidad" id="${producto.id}>
            //<input type="number" class="inputCantidad" name="cantidad" id="">

            const element_tr = document.createElement('tr');
            element_tr.id=`idtr_${producto.id}`
            element_tr.innerHTML=template
            NodoTbody.appendChild(element_tr); 
            
            //fnRegistroInicialDelPedido

            // let pedido =  {
            //     "idProducto": producto.id,
            //     "cantidad": 0,
            //     "precioVenta": producto.precio,
            //     "subtotal": 0
            // }

            let pedido = new Pedido(producto.id);
            pedido.precioVenta = producto.precio,
            
            ObjetoVenta.AddPedido(pedido)

            ToolToogleTrCARGANDO()

            fnListenerClickDelete(producto.id, fnReCalcularTotal)
            
            fnSetProductQuantity(producto)

            // console.log('AGRAGADO')           
        }else{
            alert("Producto repetido")  
        }
    }else{
        alert("Producto No disponible")
    }

}

function fnListenerClickDelete(id, callback){
    let nodoBtnDeleteProduct = document.querySelector(`#idbtndlt_${id}`)

    nodoBtnDeleteProduct.addEventListener("click",()=>{
        // console.log('------predelete-------');
        // console.log(ObjetoVenta.globalPedido);
        
        if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            toolDeleteTrOption(id, ObjetoVenta)   
            ToolToogleTrCARGANDO()
            callback()
        }
    })
}

function fnSetProductQuantity(producto){
    let nodoTdTypeSelect = document.querySelector(`#idInputCantidad_${producto.id}`)
    nodoTdTypeSelect.addEventListener('change',(e)=>{         

        console.log(e.target.value)
        let cantidad = Number(e.target.value); //combierte a numero dato del form
        
        if(cantidad>0 && Number.isInteger(cantidad)){
            let nodoSpam = document.querySelector(`#idspan_${producto.id}`)

            if(cantidad>producto.cantidad){

                alert('Cantidad mayor al stock disponible')
                nodoSpam.classList.add('warning')

                let subtotal = fnCalcularSubTotal(producto,cantidad)

                fnRegistroDelPropiedadesDelPedidoEnObjVenta(producto, cantidad, subtotal, fnReCalcularTotal)

            }
            else{
                nodoSpam.classList.remove('warning')
                let subtotal = fnCalcularSubTotal(producto,cantidad)
                fnRegistroDelPropiedadesDelPedidoEnObjVenta(producto, cantidad, subtotal, fnReCalcularTotal)
            }
        }
        else{
            alert("inserta un valor valido")
            nodoTdTypeSelect.value = '';
            fnCalcularSubTotal(producto,0)
            fnRegistroDelPropiedadesDelPedidoEnObjVenta(producto, 0, 0, fnReCalcularTotal)
        }

    })

}

function fnCalcularSubTotal(producto,cantidad){
    const nodoSubTotal = document.getElementById(`idsubtotal_${producto.id}`);
    let subtotal = producto.precio * cantidad;
    nodoSubTotal.innerHTML=`$${subtotal}`;
    return subtotal
} 

function fnRegistroDelPropiedadesDelPedidoEnObjVenta(producto, cantidad, subtotal, callback){

    // console.log('-------ObjetoVenta++----------')
    // console.log(ObjetoVenta.globalPedido);

    let indiceProd = ObjetoVenta.globalPedido.findIndex(objeto => objeto.idProducto === producto.id);
    let instanciaDelproductoPedido

    if (indiceProd !== -1) {
        instanciaDelproductoPedido = ObjetoVenta.globalPedido[indiceProd]
    }
        instanciaDelproductoPedido.cantidad = cantidad
        instanciaDelproductoPedido.subtotal = subtotal

    callback()
}

function fnReCalcularTotal(){

    let TotalPagar = ObjetoVenta.globalPedido.reduce((acumulador, pedido) => {
        return acumulador + pedido.subtotal;
    }, 0);

    NodoTotalPagar.innerHTML = `$${TotalPagar}`
    ObjetoVenta.total=TotalPagar

}

function fnListenerClickSale_Reset_validation(){
    
    NodoBottomSalesRegister.addEventListener("click",()=>{
        // console.log(ObjetoVenta)
        ObjetoVenta.date =  new Date().toLocaleDateString()
        ObjetoVenta.estado = String(NodoInputEstado.value)? String(NodoInputEstado.value): null
        ObjetoVenta.abono = Number(NodoInputAbono.value)? Number(NodoInputAbono.value): 0
        let descripcion = String(NodoTextDescripcion.value)? String(NodoTextDescripcion.value) : '' 
        if (descripcion.length <= 150) {
            ObjetoVenta.descripcion =  descripcion
        }else{
            alert('Has excedido el límite de caracteres en la descripcion.');
        }

        if(ObjetoVenta.globalPedido .length!=0){
            if(ObjetoVenta.cliente.id != null){
                if(ObjetoVenta.total != 0){
                    if(toolValidacionCantidadesDigitadas(ObjetoVenta) != 0){
                        if (confirm("¿Estás seguro de que deseas generar la venta?")) {

                            console.log('---Json Venta---')
                            let ObjetoVentaCopia = Object.assign({}, ObjetoVenta); //copiaSuperficial
                            ObjetoVentaCopia.descripcion = "Esto es solo una Copia del objeto Original"
                            ObjetoVentaCopia.globalPedido = [...ObjetoVenta.globalPedido]
                            console.log(ObjetoVentaCopia)

                            NodoInputAbono.value = 0
                            NodoTextDescripcion.value = ''
                            NodoTotalPagar.innerHTML = `$ 0.00`
                            NodoNameCostumer.innerHTML = `--Selecciona cliente--`
                            
                            let template = `\n VENTA REGISTRADA \n CLIENTE: ${ObjetoVenta.cliente.nombre} \n FECHA: ${ObjetoVenta.date} \n POT UN TOTAL DE: ${ObjetoVenta.total} \n (nota: funcionalidad por desarrollar  / Fin del programa)`
    
                            alert(template);
                            ObjetoVenta.globalPedido.forEach(objeto => {
                                toolDeleteTrOption(objeto.idProducto,ObjetoVenta);
                            });
                            ToolToogleTrCARGANDO()   
                        }
                    }else{
                        alert('Establece la cantidad.')
                    }
                }
                else{
                    alert('Establece la cantidad')
                }
            }else{
                alert('Seleciona un cliente de la lista (Despliega la lista y selecciona)')
            }
        }else{
            alert('No se ha seleccionado productos')
        }
    })  
    // if(!(ObjetoVenta.globalPedido.some(obj => obj.idProducto == producto.id))){}
}

});












