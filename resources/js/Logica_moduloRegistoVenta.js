
//////////////////////
document.addEventListener('DOMContentLoaded', () => {
    var dataglobal = []
    // let globalPedido = [{
    //     "idProducto": 1,
    //     "cantidad": 5,
    //     "precioVenta": 95,
    //     "subtotal": 100
    // },{
    //     "idProducto": 2,
    //     "cantidad": 5,
    //     "precioVenta": 95,
    //     "subtotal": 100
    // }]
    
    let  ObjetoVenta = {
        globalPedido: [{
            "idProducto": 1,
            "cantidad": 5,
            "precioVenta": 95,
            "subtotal": 100
        },{
            "idProducto": 2,
            "cantidad": 5,
            "precioVenta": 95,
            "subtotal": 100
        }],
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


    
    




    const fondo ={  ///  objeto{} literal 'fondo' //No es una CLASE pero se comporta similar a una//
		titulo: "granja", //formado por atributos
		descripcion_value: "",
		url: "title.png", //le pude haber colocado 'link',etc
		cargaOk: false, //variable creado con operador logico
		print: function(){console.log(this.titulo)}, //formada por metodos //  function print(){} como se escribiria en el contexto global  //NO USAR Arrow functions//
		//$boton:document.querySelector('#etiqueta') //se pueden guardar querys y recordar que estos atributos es buena pract empezar con $
		//getter setter antiguamente
		//this. asegura trabajar en el entorno local del metodo // a veces se pierde en el entorno y pasa a windows, documentar luego
		getTitulo: function(){ return this.titulo},
		setTitulo: function(name){ /*validacion;*/ this.titulo=name},
		//getter setter actualmente
		get descripcion(){ return this.descripcion_value},
		set descripcion(name){ /*validacion;*/ this.descripcion_value=name}
		//es buena practica que la propiedad a la que hace referencia set y get tenga un sufijo
	}


    var filteredProductsCatg = []
    var filteredProductsMarc = []
    const categoriesArray = [];
    const selectNodoCategory = document.getElementById('idcategoria');
    const selectNodoBrand = document.getElementById('idmarca');
    const selectNodoProduct= document.getElementById('idproducto');
    const NodoAddProduct= document.getElementById('idagregarProducto');

    
    
    fetch('http://localhost/ProySenaProdv01/api/get_all_product.php')
      .then(response => response.json())
      .then(data => {

        
    
        // Iterar sobre los productos y agregar las categorías al array
            //evita duplicados, se podria usar Set()
        data.forEach(product => {
        if (!categoriesArray.includes(product.categoria)) {
            categoriesArray.push(product.categoria);
        }
        });

        dataglobal = data;

      // Limpiar el select y agregar las nuevas opciones
      selectNodoCategory.innerHTML = '<option value="Categoria">Categoria</option>'

      categoriesArray.forEach(category => {
        const optionElement = document.createElement('option');
        optionElement.value = category;
        optionElement.textContent = category; 
        selectNodoCategory.appendChild(optionElement); 
      });

      fnListenerAndLoadDeSelectBrand()
      fnListenerAndLoadDeSelectProduct()
      fnOptionsCapture()
    })
    .catch(error => console.error('Error:', error));


    function fnListenerAndLoadDeSelectBrand(){
        selectNodoCategory.addEventListener('change', () => {

            const selectedCategory = selectNodoCategory.value;

            if(selectedCategory=="Categoria"){
                selectNodoBrand.innerHTML = '<option value="Marca">Marca</option>'
                selectNodoProduct.innerHTML = '<option value="Producto">Producto</option>'
            }
            else{

                filteredProductsCatg  = dataglobal.filter(product => product.categoria === selectedCategory);
            
                // Obtener las marcas únicas de los productos filtrados
                uniqueBrands = new Set(filteredProductsCatg .map(product => product.marca));
            
                // Limpiar el select de marcas y agregar las nuevas opciones
                selectNodoBrand.innerHTML = '';
            
                // Agregar una opción por defecto (opcional)
                // ... (código para agregar la opción por defecto)

                selectNodoBrand.innerHTML = '<option value="Marca">Marca</option>'
                selectNodoProduct.innerHTML = '<option value="Producto">Producto</option>'

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

            const selectedBrand = selectNodoBrand.value;

            if(selectedBrand=="Marca") selectNodoProduct.innerHTML = '<option value="Producto">Producto</option>'
            else{

                filteredProductsMarc = filteredProductsCatg.filter(product => product.marca === selectedBrand);
                
                // console.log(filteredProductsCatg)
                // console.log(filteredProductsMarc)

                // Obtener las marcas únicas de los productos filtrados
                const uniquePresent = new Set(filteredProductsMarc.map(product => product.presentacion));
            
                // Limpiar el select de marcas y agregar las nuevas opciones
                selectNodoProduct.innerHTML = '<option value="Producto">Producto</option>'
                console.log(uniquePresent)

                uniquePresent.forEach(presnt => {
                    const optionElement = document.createElement('option');
                    optionElement.value = presnt;
                    optionElement.textContent = presnt;
                    selectNodoProduct.appendChild(optionElement);
                });
            }
        });
    }

    function fnOptionsCapture(){
        NodoAddProduct.addEventListener('click', () => {
            if(selectNodoCategory.value!="Categoria" && selectNodoCategory.value!=undefined){
                if(selectNodoBrand.value!="Marca" && selectNodoBrand.value!=undefined){ 
                    if(selectNodoProduct.value!="Producto" && selectNodoProduct.value!=undefined){
                        let filteredProductSelect = filteredProductsMarc.filter(product => product.presentacion === selectNodoProduct.value);
                        fnAddOptions(filteredProductSelect[0])
                        resetOfOption(selectNodoCategory,"Categoria")
                        resetOfOption(selectNodoBrand,"Marca")
                        resetOfOption(selectNodoProduct,"Producto")
                        console.log('Logica de agregado_')

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

    function resetOfOption(nodo, selector){
        if(selector=="Categoria"){
            nodo.innerHTML = `<option value='${selector}'>${selector}</option>`
            categoriesArray.forEach(category => {
                const optionElement = document.createElement('option');
                optionElement.value = category;
                optionElement.textContent = category; 
                selectNodoCategory.appendChild(optionElement); 
              });
        }else{
            nodo.innerHTML = `<option value='${selector}'>${selector}</option>`
        }
        
    }

    /*/////////////////////////////////////////////////////////////////*/

    function fnSumarAlsubTotal(product){

    }

    function fnAddOptions(producto){
        // console.log('fnAddOptions')
        // console.log(producto)
        // console.log(producto.marca)
        // console.log(producto.presentacion)
        // console.log(producto.estado)

        if(producto.estado=="Disponible" && !(ObjetoVenta.globalPedido.some(obj => obj.idProducto == producto.id))){

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

            const NodoTbody = document.querySelector(".tabla-productos table tbody")
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


            let nodoBtnDeleteProduct = document.querySelector(`#idbtndlt_${producto.id}`)
            let nodoTdSelect = document.querySelector(`#idInputCantidad_${producto.id}`)


            nodoBtnDeleteProduct.addEventListener("click",()=>{
                console.log('------predelete-------');
                console.log(ObjetoVenta.globalPedido);

                if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
                    NodoTbody.removeChild(element_tr)
                    
                    const indice = ObjetoVenta.globalPedido.findIndex(objeto => objeto.idProducto === producto.id);

                    if (indice !== -1) {
                        ObjetoVenta.globalPedido.splice(indice, 1);
                    }
                    console.log('------delete-------');
                    console.log(ObjetoVenta.globalPedido);


                }
            })

            nodoTdSelect.addEventListener('change',(e)=>{         

                console.log(e.target.value)
                let cantidad = e.target.value;

                if(cantidad>0){
                    nodoSpam = document.querySelector(`#idspan_${producto.id}`)
                    if(cantidad>producto.cantidad){
                        alert('Cantidad mayor al stock disponible')
                        nodoSpam.classList.add('warning')

                        //fnSumarAlsubTotal()

                        const nodoSubTotal = document.getElementById(`idsubtotal_${producto.id}`);
                        let subtotal = producto.precio * cantidad;
                        nodoSubTotal.innerHTML=`$${subtotal}`;


                        console.log('-------pedido--------')

                        //fnRegistroGlobalDelPedido()

                        
                        let indiceProd = ObjetoVenta.globalPedido.findIndex(objeto => objeto.idProducto === producto.id);
                        if (indiceProd !== -1) {
                            productoPedido = ObjetoVenta.globalPedido[indiceProd]
                        }
                           productoPedido.cantidad = cantidad
                           productoPedido.subtotal = subtotal

                        console.log('-------cantidad Y SUBTOTAL----------')
                        console.log(ObjetoVenta);


                        


                        


                        //idproducto, cantidad, precio, subtotal, 
                        
                        

                    }
                    else{
                        nodoSpam.classList.remove('warning')
                        fnSumarAlsubTotal(producto)
                    }
                }
                else{
                    alert("inserta un valor valido")
                    let td = document.querySelector(`#idInputCantidad_${producto.id}`)
                    td.value = '';
                }



            })
            console.log('AGRAGADO')           
        }else{
            alert("Producto No disponible o repetido")
        }
        


        // selectNodoProduct.addEventListener('change', () => {

        //     const optionElement = document.createElement('tr');
        //     optionElement.value = presnt;
        //     optionElement.textContent = presnt;
        //     selectNodoProduct.appendChild(optionElement);

        

        //     console.log('fnAddOptions')
        //     console.log(filteredProductsMarc)

        // })
    }
    
});









