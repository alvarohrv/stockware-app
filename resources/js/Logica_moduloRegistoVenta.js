
document.addEventListener('DOMContentLoaded', () => {
//// IMPORTANTE se omite la primera Identacion!!!!!!!!!!!!!!!!!!

let dataglobal = []
let globalFilteredProductsCatg = []
let globalFilteredProductsMarc = []
let globalCategoriesArray = [];

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
    numeroFactura: "",
    total: null,
    pedido: [],
    AddPedido: function(pedido){
        this.globalPedido.push(pedido);
    }
}

const NodoTrCARGANDO= document.getElementById('idtr0');
const selectNodoCategory = document.getElementById('idcategoria');
const selectNodoBrand = document.getElementById('idmarca');
const selectNodoProduct= document.getElementById('idproducto');
const NodoBottomAddProduct= document.getElementById('idagregarProducto');
const NodoTbody = document.querySelector(".tabla-productos table tbody")
const NodoTotalPagar= document.getElementById('idtotal');





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
            uniqueBrands = new Set(globalFilteredProductsCatg .map(product => product.marca));
        
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
    


function fn_Async(){ 		
    const promesa1=(resolved, reject)=>{  // {} logica de la promesa
        setTimeout(()=>{
            resolved(usuarios) //<- ya no invoca un callback si no una funcion 'resolved()' //el valor de null para dase de datos sin error no hace falta.
                                //'resolved' es lo que deseamos retornar si la promesa es exitosa //la base de datos.
        },400) //por lo que es asincrono
    } //fin de la logica
    return new Promise(promesa1)  //retornando una promesa //promesa1 sera una fn con la logica del proceso, practicamente en un callback (que internamente posee dos callback más)
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
                        placeholder="${producto.cantidad}">
                    <span id="idspan_${producto.id}" > &#9888 </span>
                </div>
            </td>
            <td class="subtotal" id="idsubtotal_${producto.id}"> $0.00 </td>`

            //
            //<input type="number" class="inputCantidad" name="cantidad" id="${producto.id}>
            //<input type="number" class="inputCantidad" name="cantidad" id="">

            const element_tr = document.createElement('tr');
            element_tr.id=`#idtr_${producto.id}`
            element_tr.innerHTML=template
            NodoTbody.appendChild(element_tr); 
            
            //fnRegistroInicialDelPedido

            let pedido =  {
                "idProducto": producto.id,
                "cantidad": 0,
                "precioVenta": producto.precio,
                "subtotal": 0
            }
            ObjetoVenta.AddPedido(pedido)

            fnToogleTrCARGANDO(ObjetoVenta.globalPedido)

            fnDeleteOption(element_tr, producto, fnCalcularTotal)
            
            fnSetProductQuantity(producto)

            console.log('AGRAGADO')           
        }else{
            alert("Producto o repetido")  
        }
    }else{
        alert("Producto No disponible")
    }

}

function fnDeleteOption(filaTr, producto, callback){
    let nodoBtnDeleteProduct = document.querySelector(`#idbtndlt_${producto.id}`)
    nodoBtnDeleteProduct.addEventListener("click",()=>{
        console.log('------predelete-------');
        console.log(ObjetoVenta.globalPedido);
        
        if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            NodoTbody.removeChild(filaTr)
            
            const indice = ObjetoVenta.globalPedido.findIndex(objeto => objeto.idProducto === producto.id);

            if (indice !== -1) {
                ObjetoVenta.globalPedido.splice(indice, 1);
            }
            console.log('------delete-------');
            console.log(ObjetoVenta.globalPedido);

            fnToogleTrCARGANDO(ObjetoVenta.globalPedido)

            callback()
        }
    })
}

function fnSetProductQuantity(producto){
    let nodoTdTypeSelect = document.querySelector(`#idInputCantidad_${producto.id}`)
    nodoTdTypeSelect.addEventListener('change',(e)=>{         

        console.log(e.target.value)
        let cantidad = e.target.value;

        if(cantidad>0){
            nodoSpam = document.querySelector(`#idspan_${producto.id}`)

            if(cantidad>producto.cantidad){

                alert('Cantidad mayor al stock disponible')
                nodoSpam.classList.add('warning')

                let subtotal = fnCalcularSubTotal(producto,cantidad)

                fnRegistroDelPropiedadesDelPedidoEnObjVenta(producto, cantidad, subtotal, fnCalcularTotal)

            }
            else{
                nodoSpam.classList.remove('warning')
                let subtotal = fnCalcularSubTotal(producto,cantidad)
                fnRegistroDelPropiedadesDelPedidoEnObjVenta(producto, cantidad, subtotal, fnCalcularTotal)
            }
        }
        else{
            alert("inserta un valor valido")
            let td = document.querySelector(`#idInputCantidad_${producto.id}`)
            td.value = '';
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

    
    let indiceProd = ObjetoVenta.globalPedido.findIndex(objeto => objeto.idProducto === producto.id);
    if (indiceProd !== -1) {
        productoPedido = ObjetoVenta.globalPedido[indiceProd]
    }
        productoPedido.cantidad = cantidad
        productoPedido.subtotal = subtotal

    console.log('-------ObjetoVenta++----------')
    console.log(ObjetoVenta);

    callback()
}

function fnCalcularTotal(){
    ArrayPedidos = ObjetoVenta.globalPedido 
    //Sumar casa ArrayPedidos.subtotal y guardar en una variable llama TotalPagar

    let TotalPagar = ArrayPedidos.reduce((acumulador, pedido) => {
        return acumulador + pedido.subtotal;
    }, 0);

    NodoTotalPagar.innerHTML = `$${TotalPagar}`
}

function  fnToogleTrCARGANDO(ArrayPedidos){
    if(ArrayPedidos.length!=0){
        NodoTrCARGANDO.style.display="none"
    }else{
        NodoTrCARGANDO.style.display="table-row"
    }
}

});









