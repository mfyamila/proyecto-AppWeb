const shopContent = document.getElementById("shopContent");
const carrito = document.getElementById("carrito");
const modalContainer = document.getElementById("modal_container");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const contenedor_imagenes = document.getElementById("cake_fotos");
const filaRBuscador = document.getElementById("filaRBuscador");
const filaLocal = document.getElementById("filaLocal");
const usuarioEscribe = document.getElementById("usuarioEscribe");
const inputBuscador = document.getElementById("inputBuscador");
const detalleselec = document.getElementById("detalleselec");
const filaHistorial = document.getElementById("filaHistorial");



var ancho_pantalla, alto_pantalla;       //del index

var datoBuscar;
var busqueda; // metere la respuesta de la api en formato json
var busqueda2; // metere la respuesta de la api en tipo objeto
var registro = {
	url:'',
	descripcion:'',
	id:''
};
var path=[]; // arreglo de tipo registro que contiene cada resultado
var client_id="client_id=NPrhrwLpfTWXBN0do8GImDv8Zo4j8r_F0RAF7bB6qT4";
var respuestaCol=[null];
var urls2=[]

//de las galerias
var urlActual = window.location.href;
console.log(urlActual);
console.log(typeof urlActual);


let indice= urlActual.indexOf("=")
var id =urlActual.slice(indice+1);
//console.log(id);





//////INDEX


var acciones = {
	listo : function() {
		jQuery(".cabecera .menu a[href*='#']").click(acciones.irancla);
		jQuery(".cabecera .hamb").click(acciones.abrirmenu);
		jQuery(".cabecera .search").click(acciones.abrirsearch);
	},
	

	cerrarmenu: function(){
		jQuery(".cabecera .menu").removeClass("abierto");
		jQuery("body").toggleClass("abierto");
		jQuery(".cabecera .hamb").find("i").toggleClass("fa-x");
	},




	irancla: function(e){				/*el "e" es por href* para quitarle el #*/
		e.preventDefault();
		//alert("con ancla");
		var ancla = this.hash;
		var url = jQuery(this).attr("href");    /*de este elemento quiero obtener su href, url*/

		if(jQuery(ancla).length > 0){	
			acciones.cerrarmenu();					
			acciones.detalleancla(ancla);
		}else {
			window.location.href = url;    /*si no lo encuentra dentro de la pag te redirige*/
		}
	},
	detalleancla: function(ancla){
		jQuery("html,body").animate({
				"scrollTop": jQuery(ancla).offset().top    /*obtenemos desde top cero hasta el ancla la posición*/
			},800);

	},



	abrirmenu: function(e){				
		e.preventDefault();
		jQuery(".cabecera .menu").toggleClass("abierto");
		//jQuery(".cabecera .menu").addClass("abierto");
		//jQuery(".cabecera .menu").removeClass("abierto");
		jQuery("body").toggleClass("abierto");
		jQuery(".cabecera .search").toggleClass("abierto")
		jQuery(this).find("i").toggleClass("fa-x");
		jQuery(".cabecera .carrito").toggleClass("abierto")

		
	},
	abrirsearch: function(e){				
		e.preventDefault();
		jQuery("body").toggleClass("abierto");
		//jQuery(".cabecera .padding-buscador").toggleClass("abierto");    
		jQuery(".banner-h .banner-home").toggleClass("filtro_color4 ");
		jQuery(".banner-h .container").toggleClass("filtro_color4 ");
		jQuery(".galerias").toggleClass("filtro_color4");
		jQuery(".sobre_mi").toggleClass("filtro_color4");
		jQuery("#inputBuscador").toggle();    

		
	},




	/*abrirlocation:function(e){
		e.preventDefault();
		jQuery(".cake_fotos .modal_location").toggleClass("abierto");
	},*/
	/*abrircarrito: function(e){  
	    e.preventDefault();                               
		
	},*/
	precarga: function(){
		var ancla = (window).location.hash;      /*obtengo el # de la url de la ventana*/
		if(jQuery(ancla).length > 0){						
			setTimeout(function(){
				acciones.detalleancla(ancla);
			},1000);
		}
		acciones.redimensionar();


	},
	redimensionar: function(){
		ancho_pantalla = jQuery(window).width();
		//alto_pantalla = jQuery(window).height();
		//console.log(ancho_pantalla+" - "+alto_pantalla);
		if(ancho_pantalla < 768)								
		{
			alto_menu = jQuery(".cabecera").innerHeight()   ;   /*el alto completo*/
			jQuery(".cabecera .menu").css({"padding-top":alto_menu,"padding-bottom":alto_menu});
		}else
		{
			jQuery(".cabecera .menu").css({"padding-top":0,"padding-bottom":0});
		}
	}

};
jQuery(document).ready(acciones.listo);
jQuery(window).on("load",acciones.precarga);
jQuery(window).resize(acciones.redimensionar);

/////////

//BUSCADOR//



// genero la conexion a la api con ajax

	var paginaActual = 1;
	$('#enviarBusqueda').click(function(ev2){
		ev2.preventDefault();
		datoBuscar= $(usuarioEscribe).val();

	var valordeUsuario = document.getElementById("usuarioEscribe").value;    //obtengo lo que el usuario escribio
	console.log(valordeUsuario);

	var url;
	
	//comparo y muestro la tematica asociada					
	if (
    valordeUsuario === "familia" ||
    valordeUsuario === "familias" ||
    valordeUsuario === "family" ||
    valordeUsuario === "hermanos"
  ) {
    url =
      "https://api.unsplash.com/search/photos?client_id=NPrhrwLpfTWXBN0do8GImDv8Zo4j8r_F0RAF7bB6qT4&query=familia&page=${paginaActual}&per_page=3";
  } else if (
    valordeUsuario === "cake smash" ||
    valordeUsuario === "smash cake"
  ) {
    url =
      "https://api.unsplash.com/search/photos?client_id=NPrhrwLpfTWXBN0do8GImDv8Zo4j8r_F0RAF7bB6qT4&query=cake+smash&page=${paginaActual}&per_page=3";
  } else if (
    valordeUsuario === "maternidad" ||
    valordeUsuario === "embarazo" ||
    valordeUsuario === "embarazadas" ||
    valordeUsuario === "pregnant"
  ) {
    url =
      "https://api.unsplash.com/search/photos?client_id=NPrhrwLpfTWXBN0do8GImDv8Zo4j8r_F0RAF7bB6qT4&query=pregnant&page=${paginaActual}&per_page=3";
  } else if (
    valordeUsuario === "newborn" ||
    valordeUsuario === "recien nacido" ||
    valordeUsuario === "bebe" ||
    valordeUsuario === "bebes" ||
    valordeUsuario === "baby"

    ) {
    url =
      "https://api.unsplash.com/search/photos?client_id=NPrhrwLpfTWXBN0do8GImDv8Zo4j8r_F0RAF7bB6qT4&query=newborn&page=${paginaActual}&per_page=3";
  }

			
		    $.ajax({
			method: "GET",
			url : url,
			data: {
			valorInputUsuario: valordeUsuario     // datoBuscar va ser igual a valordeUsuario

			}
		}).done(function(response) {

			busqueda= JSON.stringify(response.results); //convierte a json	
			busqueda2=JSON.parse(busqueda); // lo paso a objeto
			console.log(busqueda2); 
			//console.log( busqueda);
			
			
			long= busqueda2.length;
			
			
			//console.log(busqueda2[i].urls.raw);
			for(let i=0; i < long; i++) {
				obj={
					url:'',
					descripcion:'',
					id:'',
					fotolocation:'',
					created_at:'',


				};
				obj.url=busqueda2[i].urls.small;    				//este me devuelve la url de la foto
				//console.log(obj.url);
				obj.descripcion=busqueda2[i].tags[0].title;   		//titulo 
				obj.id=busqueda2[i].id;
				obj.fotolocation=busqueda2[i].user.location;  		//lugar donde se tomo la foto
				// Obtener la fecha en formato ISO 8601
				const fechaISO = busqueda2[i].created_at;			//obtengo la fecha de la api y la formateo a dd-mm-aaaa

				// Crear un objeto Date a partir de la fecha ISO
				const fecha = new Date(fechaISO);

				// Obtener los componentes de la fecha (día, mes, año)
				const dia = fecha.getDate();
				const mes = fecha.getMonth() + 1; // Los meses en JavaScript se indexan desde 0, por lo que se suma 1
				const año = fecha.getFullYear();

				// Crear la fecha formateada en el formato "día mes año"
				const fechaFormateada = `${dia}/${mes}/${año}`;

				// Asignar la fecha formateada al objeto "obj"
				obj.created_at = fechaFormateada;
				//fecha cuando se tomo la foto
				obj.alt_description=busqueda2[i].alt_description  	//una descripción 
				path[i]=obj;
				
			}
			//console.log(path);
			//console.log(datoBuscar);


			if (filaRBuscador.childElementCount > 0) {                //verifica si el númer hijos es mayor que 0
		  		while (filaRBuscador.firstChild) {
		    		filaRBuscador.removeChild(filaRBuscador.firstChild);       //elimina el primer hijo del contenedor filaRbuscador
		  }
		}
		//let detalle_inputLocal = JSON.parse(localStorage.getItem("detalle_inputLocal") || []);
			//mientras que i <= 2, se muestran tres resultados de búsqueda
			for( let i = 0; i <= 2; i++) { 
				                                     
				let columnaImagenB = document.createElement("div");            
			      columnaImagenB.className = "columna columna-mb-100 con-padding"; 
			      columnaImagenB.innerHTML = `
			      <p class="sin-paddingAyB" >${path[i].descripcion} </p>
			      
			      `;

			      //envia la búsqueda hacia la galería
			      let contenedorImagenB = document.createElement("div");
			      contenedorImagenB.className = "contenedor-cuadrado";
			      contenedorImagenB.innerHTML = `
			      <img id="imagen${i}" src="${path[i].url}">
			      <a id="detalle-buscador-${i}" class="btn boton-transparente btn-buscador-detalle contenido-cuadrado-buscador" href="galeria.html"target="_self">Ver más</a>
			      `;

			      columnaImagenB.append(contenedorImagenB);
			      filaRBuscador.append(columnaImagenB);

			
			//Almaceno en el localstorage la info necesaria
			(function (index) {
		    $(`#detalle-buscador-${index}`).click(function () {
		    	detalle_inputLocal.push({
		    		srcImgLocal: path[index].url,
		    		created_atLocal: path[index].created_at,
		    		alt_descriptionLocal: path[index].alt_description,
		    		title:path[index].descripcion
		    	});
		    	
		    	//almaceno la info en el localstorage
		    	guardarLocal();  
			 });
		  	})
		  	(i); //valor actual de la interacion

		  	//stringify porque localstorage solo acepta strings
		  	const guardarLocal =() => {
		    		localStorage.setItem("historialLocal",JSON.stringify(detalle_inputLocal));
		    	};

			       /*borra cuando hace click en la lupita */
				$("#buscador").on("click", function() {
				    $(filaRBuscador).empty(); 
				  });

 };


			// menejo de excepcion errores
		}).fail(function(jqXHR, textStatus) {
			console.log("Request failed: " + textStatus);

		});
	});


	/* manejo de los eventos en la sección GALERIA */
	
  $('#Familias').click(function(ev3) {
  	/*if(localStorage.getItem('srcImg')) {
    // Ocultar el resultado de búsqueda
    $('.srcImg').hide();
  }*/
  	localStorage.removeItem('srcImg');
    // Redireccionar a la página de galerías
   
    var hrefValue = $("#Familias").attr('href');
    hrefValue = hrefValue + "?id=66119622";
    window.location.href = $("#Familias").attr('href', hrefValue);

  });


jQuery ('#maternidad').click(function(ev3){
	localStorage.removeItem('srcImg');
	var hrefValue=$("#maternidad").attr('href');
	hrefValue= hrefValue + "?id=uOcIhRUVwmY";
	$("#maternidad").attr('href',hrefValue);


})

jQuery ('#CakeSmash').click(function(ev3){
	localStorage.removeItem('srcImg');

	var hrefValue=$("#CakeSmash").attr('href');
	hrefValue= hrefValue + "?id=UJiWvLKePCc";
	$("#CakeSmash").attr('href',hrefValue);

})
jQuery ('#Newborn').click(function(ev3){
	localStorage.removeItem('srcImg');
	var hrefValue=$("#Newborn").attr('href');
	hrefValue= hrefValue + "?id=3729337";

	$("#Newborn").attr('href',hrefValue);

})



/***CODIGO DEL DETALLE***/



// Muestra el detalle del último elemento guardado en el localStorage. Clave srcImg
let detalle_inputLocal = JSON.parse(localStorage.getItem("historialLocal")) || [];
if (localStorage.getItem('historialLocal')) {
  // Vacio el contenedor para eliminar detalles anteriores
  filaLocal.innerHTML = '';

  // Obtengo el último detalle guardado
  const ultimoDetalle = detalle_inputLocal[detalle_inputLocal.length - 1];

  var guardado = ultimoDetalle.srcImgLocal;
  var title = ultimoDetalle.title;
  var fecha = ultimoDetalle.created_atLocal;
  var descripcionDetalle = ultimoDetalle.alt_descriptionLocal;

  let columnaTituloLocal = document.createElement("div");
  columnaTituloLocal.className = "columna columna-mb-100";
  columnaTituloLocal.innerHTML = `
    <p class="titulodetalle margenDetalle">: ${title}</p>
  `;

  let columnaDetalleLoc = document.createElement("div");
  columnaDetalleLoc.className = "columna-mb-100 detdescripciones";
  columnaDetalleLoc.innerHTML = `
    <p class="columna">${descripcionDetalle}</p>
    <p class="columna">${fecha}</p>
  `;

  let columnaBtnCargar = document.createElement("div");
  columnaBtnCargar.className = "columna-mb-100 sin-padding detdescripciones";
  columnaBtnCargar.innerHTML = `
    <a id="cargar" href="galeria.html" class="btn-cargar" target="_self">cargar más</a>`;
  
  let contenedorImagenLocal = document.createElement("div");
  contenedorImagenLocal.className = "contenedor-cuadrado";
  contenedorImagenLocal.innerHTML = `
    <img id="img_local" class="filtro_color2" src="${guardado}">
  `;

  filaLocal.append(columnaTituloLocal, columnaDetalleLoc); 
  columnaDetalleLoc.append(contenedorImagenLocal, columnaBtnCargar);
}



/****CODIGO DEL HISTORIAL*****/


$('#enlaceHistorial').click(function(ev3) {
  ev3.preventDefault();
  
  if (localStorage.getItem('historialLocal')) {
    let detalle_inputLocal = JSON.parse(localStorage.getItem("historialLocal")) || [];

    filaLocal.innerHTML = '';
    // borro el contenido actual del historial antes de agregar los nuevos detalles
    filaHistorial.innerHTML = '';

    //bandera para colocar margen
    let primerDetalle = true;

    // recorro el array en orden inverso para mostrar el último elemento primero
    for (let i = detalle_inputLocal.length - 1; i >= 0; i--) {
      var guardado = detalle_inputLocal[i].srcImgLocal;
      var title = detalle_inputLocal[i].title;
      var fecha = detalle_inputLocal[i].created_atLocal;
      var descripcionDetalle = detalle_inputLocal[i].alt_descriptionLocal;

      let columTituloLocalH = document.createElement("div");
      columTituloLocalH.className = "columna columna-mb-100";

      // si es el primer detalle agrego el margen
      if (primerDetalle) {
        columTituloLocalH.innerHTML = `
          <p class="titulodetalle margenDetalle">: ${title}</p>
        `;
        primerDetalle = false; // ya no es el primer detalle
      } else {
        columTituloLocalH.innerHTML = `
          <p class="titulodetalle">${title}</p>
        `;
      }

      let columDetalleLocH = document.createElement("div");
      columDetalleLocH.className = "columna-mb-100 detdescripciones";
      columDetalleLocH.innerHTML = `
        <p class="columna">${descripcionDetalle}</p>
        <p class="columna">${fecha}</p>
      `;
      
      let contenImagenLocalH = document.createElement("div");
      contenImagenLocalH.className = "contenedor-cuadrado";
      contenImagenLocalH.innerHTML = `
        <img id="img_local" class="filtro_color2" src="${guardado}">
      `;
       let btn_shared = document.createElement("div");     //aquí se coloca la locación de la foto
       btn_shared.className = "contenido-cuadrado-his";
       btn_shared.innerHTML =     
        `<a href="" ="shared_icon"><i class="fa-solid fa-share"></i></a>
        `; 

      filaHistorial.append(columTituloLocalH, columDetalleLocH); 
      columDetalleLocH.append(contenImagenLocalH);
      contenImagenLocalH.append(btn_shared)
    }
  }
});








		  	

////////////////////////




//CARRITO DE COMPRAS//

let carrito_input = JSON.parse(localStorage.getItem("carritoLocal")) || [];          //si hay algo guardado en el local o si esta vacio 

$('#carrito').click(function(event){           //para quitarle el #  
	event.preventDefault();
		});

const getProducts = async () => {					//función asincrona
	const response = await fetch ("data.json");		//llamo a mis datos que estan en json, ruta. Para que la promesa se termine correctamnete 
	const data = await response.json();				//almaceno los datos pasado a json
	//console.log(data);


	data.forEach((product)=>{
	let content = document.createElement("div");
	content.className = "card";
	content.innerHTML = 
	`<img src="${product.img}">
	<h3>${product.nombre} </h3>
	<p>${product.precio} $</p>
	`;
	shopContent.append(content);              /*agregar a venta de mi html el contenido "contet"*/

	let comprar = document.createElement("button");
	comprar.innerText = "comprar";
	comprar.className = "manito";

	content.append(comprar);

	comprar.addEventListener("click",() => {     //cuando el usuario hace click trae:
		const repeat = carrito_input.some((reapeatProduct) => reapeatProduct.id === product.id);

		if (repeat) {
			carrito_input.map((prod) => {		//recorro el carrito con la variable prod y consulto si ese id coincide con uno de los del carrito_input
				if (prod.id === product.id){
					prod.cantidad++;			//agarra ese producto y suma 1
				}
			});									
		}else {
		carrito_input.push({
			id: product.id,
			img: product.img,
			nombre: product.nombre,
			precio: product.precio,
			cantidad: product.cantidad
			});
	
		console.log(carrito_input);
		carritoCounter();
		saveLocal();
		}
	});
});
	
};
getProducts();



////////////////

		const pintarCarrito = () => {							//función
		modalContainer.innerHTML = "";		////////////					//para que no se itere el carrito
		modalContainer.style.display = "flex";					//para que no se cuelgue la x
		//console.log("hola funciona");
		const modalHeader = document.createElement("div");
		modalHeader.className = "modal_header";
		modalHeader.innerHTML = `
		<h1 class="modal_header_title">Carrito</h1>
		`;
		modalContainer.append(modalHeader);						//el div de modal_Header cuando hace click en el icono de carrito, dentro del div padre******************************

		const modalButton = document.createElement("h1");
		modalButton.innerText = "x";
		modalButton.className = "manito";

		modalButton.addEventListener("click",() => {      ////////     //para que funcione la x
		modalContainer.style.display = "none";
		});
	

		modalHeader.append(modalButton);                        //en el header coloca el boton


		

		carrito_input.forEach((product) => {					//lo que eligio el usuario,recorro el carrito------ en descktop puede decir Cantidad: 
			let carritoContent = document.createElement("div")
			carritoContent.className = "modal_content"
			carritoContent.innerHTML = `
			<img src= "${product.img}">
			<h3>${product.nombre}</h3>
			<p>${product.precio}$</p>
			<span class="restar manito"> - </span>
			<p>${product.cantidad}</p>	
			<span class="sumar manito"> + </span>
			<span class="deleteProduct"> ✕ </span>

			`;
		modalContainer.append(carritoContent);
		//console.log(carrito_input.length);

		let restar = carritoContent.querySelector(".restar");

		restar.addEventListener("click",() => {
			if (product.cantidad !== 1) {
				product.cantidad--;  // resta la cantidad del producto	
			}
				saveLocal();
				pintarCarrito(); 
		});
		let sumar = carritoContent.querySelector(".sumar");

		sumar.addEventListener("click",() => {
			product.cantidad++;	
			saveLocal();
			pintarCarrito(); 
		});
		let eliminar = carritoContent.querySelector(".deleteProduct");   //para ser más especifico carritoContent, detecto el boton
		eliminar.addEventListener("click", () => {
			eliminarProducto(product.id);                               //detecto el id
		})

		});
		
		const total = carrito_input.reduce((acc,el) => acc + el.precio * el.cantidad, 0);
		console.log(total);

		     //calcula el total que esta dentro de carrito_input

		const totalbuying = document.createElement("div");						//creo el footer
		totalbuying.className = "total_content";
		totalbuying.innerHTML = `Total a pagar : ${total} $
		`;

		modalContainer.append(totalbuying);

};


carrito.addEventListener("click", pintarCarrito);


const eliminarProducto = (id) => 										//product.id lo recibo en la función como parametro
{
	const foundId = carrito_input.find((element) => element.id === id);       //busca dentro del carrito el id de los productos,busca el id del carrito que coincida con id
	carrito_input = carrito_input.filter((carrito_inputId) => {			//filtro todo el carrito_input, piso el anterior 
		return carrito_inputId !== foundId;								 

	});
	carritoCounter();
	saveLocal();
	pintarCarrito();

};


const carritoCounter = () => {
	const carritoLength = carrito_input.length;
	if (carritoLength >= 1 ) {
		cantidadCarrito.style.display = "block";  //para que se muestre el contador xq estaba en none
	};

	localStorage.setItem("carritoTamaño", JSON.stringify(carritoLength))
	cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoTamaño"));
};



//set Item
const saveLocal = () => {													//función para enviar la info al locastorage
	localStorage.setItem("carritoLocal", JSON.stringify(carrito_input));
};

carritoCounter();




//GALERIAS/////


$(document).ready(function(){

     
        const urlApi= "https://api.unsplash.com/collections/"+id+"?client_id=NPrhrwLpfTWXBN0do8GImDv8Zo4j8r_F0RAF7bB6qT4";    
              
         $.ajax({				
                    url: urlApi,//"https://api.unsplash.com/collections/1052529?client_id=NPrhrwLpfTWXBN0do8GImDv8Zo4j8r_F0RAF7bB6qT4", 
                    method: "GET",
                    headers: {
                        //Authorization: "NPrhrwLpfTWXBN0do8GImDv8Zo4j8r_F0RAF7bB6qT4" // no me sirve me rechaza el token de esta manera. 
                        }, //configuro el encabezado con mi token de unplash 
                        data: {		
                        }
         }).done(function(response) {

                        
                        respuestaCol= JSON.stringify(response); 
                        respuestaCol= JSON.parse(respuestaCol);	
                        //$("#infoColections").html("Galería "+respuestaCol.title)
                        //$("#infoColections").html("Colección "+respuestaCol.title+ ": "+respuestaCol.cover_photo.user.instagram_username)				
                        console.log(respuestaCol);// para mostrar todo lo que devuelve la api

                        long2=respuestaCol.preview_photos[0].urls.small;
                        console.log(long2);
                        longitud=respuestaCol.preview_photos.length;
                        console.log(longitud);
                        for(let h=0; h < longitud; h++) { 
                            urls2[h]=respuestaCol.preview_photos[h].urls.small;                            
                        }
                        console.log(urls2);

                        var cantidadImagenes;
                        cantidadImagenes=urls2.length;
                        //Vacio el contenedor del detalle para que no se vea
                        filaLocal.innerHTML = '';
                        for(let i=0; i < cantidadImagenes; i++) {
                            if (i===0){                                                    //para que la primer foto no tenga padding top
                                let columnaImagen = document.createElement("div");            
                                columnaImagen.className = "columna columna-mb-100";      
                                let contenedorImagen = document.createElement("div");
                                contenedorImagen.className = "contenedor-cuadrado";
                                contenedorImagen.innerHTML = 
                                    `<img class="filtro_color2" src="${urls2[i]}">
                                    `;  
                                let contenedor_title = document.createElement("div");     
                                contenedor_title.className = "contenido-cuadrado";
                                contenedor_title.innerHTML = 
                                    `<h1>${respuestaCol.title}</h1>
                                    `;
                                contenedorImagen.append(contenedor_title);                     //para que contenedor_title quede dentro del div contenedorImagen
                                contenedor_imagenes.append(columnaImagen,contenedorImagen); 
                            }else{
                                let columnaImagen = document.createElement("div");            //creo un div
                                columnaImagen.className = "columna columna-mb-100 tope";      //le asigno clases que ya tienen definidos estilos
                                let contenedorImagen = document.createElement("div");
                                contenedorImagen.className = "contenedor-cuadrado";
                                contenedorImagen.innerHTML = 
                                    `<img class="filtro_color2" src="${urls2[i]}">
                                    `; 
                                let button_location = document.createElement("div");     //aquí se coloca la locación de la foto
                                button_location.className = "contenido-cuadrado-cake";
                                button_location.innerHTML =     
                                    `<a href="" class="location_icon"><i class="fa-solid fa-location-dot"></i></a>
                                    
                                    `; 

                                let contenedor_location = document.createElement("div");
                                contenedor_location.className = "modal_location";
                                contenedor_location.innerHTML =
                                	`<p>${respuestaCol.cover_photo.user.location}</p>
                                	`;
                                button_location.append(contenedor_location);
                                contenedorImagen.append(button_location);
                                contenedor_imagenes.append(columnaImagen,contenedorImagen);             //los coloco en orden, padre e hijo.  en #cake_fotos los agrego
                           


                           }

                          
                        
                        }  
                        }).fail(function(jqXHR, textStatus) {
                            console.log("Request failed: " + textStatus);
                            
                        });	   

});



