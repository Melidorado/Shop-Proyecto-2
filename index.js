//-------------------------FILTROS BUSQUEDA PRODUCTOS-------------------------------//

const filtroBusqueda = document.getElementById("busqueda-usuario");
const productos = document.getElementsByClassName("productos");
const filtroRating = document.getElementsByClassName("review-filter");
const filtroCategoria = document.querySelectorAll("input[name='categoria']");

//--------------FILTRO POR CATEGORIA----------------//

for (let checkbox of filtroCategoria) {
  checkbox.oninput = () => {
    filtrarTarjetas();
  };
}

//-------FILTRO ESCRITURA----------//
filtroBusqueda.oninput = () => {
  filtrarTarjetas();
};

//----------FILTRO POR RATING------------------//

for (let checkbox of filtroRating) {
  checkbox.oninput = () => {
    filtrarTarjetas();
  };
}

const filtrarTarjetas = () => {
  for (let producto of productos) {
    if (pasaFiltros(producto)) {
      mostrarTarjetas(producto);
    } else {
      ocultarTarjetas(producto);
    }
  }
  mostrarCantidadDeProductos()
};

const mostrarTarjetas = (producto) => {
  return producto.classList.remove("hidden-tarjetas");
};

const ocultarTarjetas = (producto) => {
  return producto.classList.add("hidden-tarjetas");
};

const hayAlgunaCategoriaChequeada = () => {
  for (let checkbox of filtroCategoria) {
    if (checkbox.checked) {
      return true;
    }
  }
  return false;
};

const hayAlgunRatingSeleccionado = () => {
  for (let checkbox of filtroRating) {
    if (checkbox.checked) {
      return true;
    }
  }
  return false;
};

const hayAlgoEscritoEnInput = () => {
  return Boolean(filtroBusqueda.value);
};

const coincideBusquedaInputConTarjeta = (producto) => {
  const nombreTarjeta = producto.dataset.nombre.toLowerCase();
  const busquedaUsuario = filtroBusqueda.value.toLowerCase();

  if (nombreTarjeta.includes(busquedaUsuario)) {
    return true;
  } else {
    return false;
  }
};

const coincideCategoriaConTarjeta = (producto) => {
  for (let checkbox of filtroCategoria) {
    if (checkbox.value === producto.dataset.categoria && checkbox.checked) {
      return true;
    }
  }
  return false;
};

const coincideRatingConTarjeta = (producto) => {
  for (let checkbox of filtroRating) {
    if (checkbox.value === producto.dataset.rating && checkbox.checked) {
      return true;
    }
  }
  return false;
};

const filtroInputEscrito = (producto) => {
  if (hayAlgoEscritoEnInput()) {
    return coincideBusquedaInputConTarjeta(producto);
  } else {
    return true;
  }
};

const filtroCategoriaSeleccionada = (producto) => {
  if (hayAlgunaCategoriaChequeada()) {
    return coincideCategoriaConTarjeta(producto);
  } else {
    return true;
  }
};

const filtroRatingSeleccionado = (producto) => {
  if (hayAlgunRatingSeleccionado()) {
    return coincideRatingConTarjeta(producto);
  } else {
    return true;
  }
};

const pasaFiltros = (producto) => {
  if (
    filtroInputEscrito(producto) == true &&
    filtroCategoriaSeleccionada(producto) == true &&
    filtroRatingSeleccionado(producto) == true
  ) {
    return true;
  } else {
    return false;
  }
};

//------------- CONTADOR TARJETAS QUE SE MUESTRAN -------------------//

const cantidadProductosMostrados = document.getElementById("cantidad-productos-mostrados")

 const mostrarCantidadDeProductos = () => {
   const productosEscondidos = document.querySelectorAll(".hidden-tarjetas")
   const cantidadProductosEscondidos = productosEscondidos.length
   const resultadoProductosMostrados = 12 - cantidadProductosEscondidos

   cantidadProductosMostrados.textContent = resultadoProductosMostrados
 }

//------------BOTON LIMPIAR FILTROS--------------------//

const limpiar = document.querySelector(".limpiar");


limpiar.onclick = () => {
  filtroBusqueda.value = "";
  for (let producto of productos) {
    producto.classList.remove("hidden");
  }
  for (let checkbox of filtroRating) {
    checkbox.checked = false;
  }
  for (let checkbox of filtroCategoria) {
    checkbox.checked = false;
  }
};

//---------------------------------------- CARRITO DE COMPRAS LATERAL ---------------------------------------------------//

const botonCarrito = document.getElementById("carrito");
const botonCerrarMenu = document.getElementById("cerrar");
const menuLateral = document.getElementById("carrito-lateral");
const overlay = document.getElementById("overlay");

const indicadorProductosAgregados = document.getElementById(
  "indicador-cantidad-productos"
);

botonCarrito.onclick = () => {
  menuLateral.classList.add("mostrar-menu");
  overlay.classList.remove("hidden");
  document.body.classList.add("no-scroll");

  crearProductosEnCarrito()

  calcularSubtotal()

  borrarProductoDeCarrito()

  aumentarCantidadDeProducto()
};

botonCerrarMenu.onclick = () => {
  menuLateral.classList.remove("mostrar-menu");
  overlay.classList.add("hidden");
  document.body.classList.remove("no-scroll");
};

//-------------------------------------- CHECKOUT COMPRAS --------------------------------------------------//

const botonComprar = document.getElementById("boton-comprar");
const overlayCheckout = document.getElementById("overlay-checkout");
const menuCheckout = document.getElementById("checkout");
const botonSeguirComprando = document.getElementById("seguir");

botonComprar.onclick = () => {
  menuCheckout.classList.remove("hidden");
  overlayCheckout.classList.remove("hidden");

  totalCheckout()
};

botonSeguirComprando.onclick = () => {
  menuCheckout.classList.add("hidden");
  overlayCheckout.classList.add("hidden");
};

//-------------------------------------- ALERT VACIAR CARRITO -----------------------------------------------//

const botonVaciar = document.getElementById("boton-vaciar");
const botonCancelar = document.getElementById("cancelar-vaciar");
const botonConfirmarVaciar = document.getElementById("vaciar");
const overlayVaciar = document.getElementById("overlay-vaciar");
const alertVaciar = document.getElementById("alert-vaciar");

const subYBotones = document.getElementById("contenedor-subtotal-botones");

botonVaciar.onclick = () => {
  overlayVaciar.classList.remove("hidden");
  alertVaciar.classList.remove("hidden");
};

botonCancelar.onclick = () => {
  overlayVaciar.classList.add("hidden");
  alertVaciar.classList.add("hidden");
};

botonConfirmarVaciar.onclick = () => {
  overlayVaciar.classList.add("hidden");
  alertVaciar.classList.add("hidden");
  eliminarProductos()
  indicadorProductosAgregados.textContent =
    "No tienes productos en el carrito, ¡agrega algunos!";
  subYBotones.classList.add("hidden");
};

const eliminarProductos = () => {
  const productosSeleccionados = document.querySelectorAll(".producto-agregado");
  for (let producto of productosSeleccionados) {
    producto.classList.remove("producto-agregado")
  
  }
  contenedorProductosEnCarrito.innerHTML = eliminarTarjetasDeCarrito()
  calcularProductosEnCarrito()
}



//-------------------------------------- CAMBIAR DE GRILLA A LISTA O VICEVERSA -----------------------------------------------//
const botonGrilla = document.getElementById("grilla");
const botonLista = document.getElementById("lista");
const contenedorProductos = document.querySelector("#grilla-o-lista");

botonLista.onclick = () => {
  contenedorProductos.classList.remove("grilla");
  contenedorProductos.classList.add("lista");
};

botonGrilla.onclick = () => {
  contenedorProductos.classList.remove("lista");
  contenedorProductos.classList.add("grilla");
};

//-------------------------------------- AGREGAR PRODUCTOS AL CARRITO ---------------------------------------------------//

const botonesAgregarAlCarrito = document.getElementsByClassName("boton-comprar-tarj");
const contenedorProductosEnCarrito = document.querySelector("#espacio-para-productos");
const cantidadProductosEnCarrito = document.querySelector("#cantidad-en-carrito");

const subtotalEnCarrito = document.querySelector("#subtotal");
const subtotalEnCheckout = document.querySelector("#subtotal-checkout")

for (let boton of botonesAgregarAlCarrito) {
  boton.onclick = () => {
    const padreBoton = boton.parentNode;
    const tarjeta = padreBoton.parentNode;

    tarjeta.classList.add("producto-agregado");
    calcularProductosEnCarrito()
  };
}

const calcularProductosEnCarrito = () => {
  const productosSeleccionados = document.querySelectorAll(".producto-agregado");
  const cantidadProductosSeleccionados = productosSeleccionados.length
  if (cantidadProductosSeleccionados === 0) {
    indicadorProductosAgregados.textContent = "No tienes productos en el carrito, ¡agrega algunos!";
    subYBotones.classList.add("hidden")
    cantidadProductosEnCarrito.textContent = cantidadProductosSeleccionados
  }
  else {
  cantidadProductosEnCarrito.textContent = cantidadProductosSeleccionados
  indicadorProductosAgregados.textContent = `${cantidadProductosSeleccionados} producto(s) agregado(s)`;
  }
}

const eliminarTarjetasDeCarrito = () => {
  const productoVacioEnHTML = `
<div></div>
`;
return productoVacioEnHTML
}

const crearTarjetaProducto = (producto) => {
  const productoHTML = `
  <div data-nombre="${producto.dataset.nombre}" class="contenedor-producto-carrito">
      <div class="contenedor-img-carrito">
        <img clas="img-carrito" src="${producto.dataset.img}">
      </div>
      <div class="contenedor-descripcion-carrito">
        <div class="linea-superior-descripcion">
          <h3>${producto.dataset.nombre}</h3>
          <button class="boton-tacho"><i class="far fa-trash-alt tacho"></i></button>
        </div>
        <div class="linea-inferior-descripcion">
          <label class="medida-productos">
            <input data-precio="${producto.dataset.precio}" id="cantidad-productos" class="cantidad-productos" type="number" min="1" value="1">unidades
          </label>
          <p>$ ${producto.dataset.precio}</p>
        </div>
      </div>
  </div>
  `;

  return productoHTML;
};


const calcularSubtotal = () => {
  const inputsCantidadProducto = document.querySelectorAll(
    ".cantidad-productos"
  );
  subtotal = 0
  for (let input of inputsCantidadProducto) {
    subtotal = subtotal + (input.value * Number(input.dataset.precio))
  }
  subtotalEnCarrito.textContent = subtotal
  subtotalEnCheckout.textContent = subtotal

  return subtotal
};

const crearProductosEnCarrito = () => {
  const productosSeleccionados = document.querySelectorAll(
    ".producto-agregado"
  );
  if (productosSeleccionados.length === 0) {
    indicadorProductosAgregados.textContent =
      "No tienes productos en el carrito, ¡agrega algunos!";
  } else {
    
    todosLosProductosEnHTML = " ";
    for (let producto of productosSeleccionados) {
      todosLosProductosEnHTML =
        todosLosProductosEnHTML + crearTarjetaProducto(producto);
    }
    contenedorProductosEnCarrito.innerHTML = todosLosProductosEnHTML;
    
  }
}
const aumentarCantidadDeProducto = () => {
  const inputsCantidadProducto = document.querySelectorAll(
    ".cantidad-productos"
  );
  for (let input of inputsCantidadProducto) {
    subtotal = 0 
    input.oninput = () => {
      subtotal = subtotal + (input.value * Number(input.dataset.precio))

      recalcularSubtotal()
    }
    
  }
}

const borrarProductoDeCarrito = () => {
  const botonesBorrarProductoEspecifico = document.querySelectorAll(".boton-tacho")
  
  for (let boton of botonesBorrarProductoEspecifico) {
    boton.onclick = () => {
      const contenedorBoton = boton.parentNode
      const contenedorLinea = contenedorBoton.parentNode
      const tarjeta = contenedorLinea.parentNode
      const nombre = tarjeta.dataset.nombre
      
      recalcularProductosEnCarrito(nombre)

      tarjeta.innerHTML = eliminarTarjetasDeCarrito()

      recalcularSubtotal()
    }
  }
}

const recalcularSubtotal = () => {
  
  const inputsCantidadProducto = document.querySelectorAll(
    ".cantidad-productos"
  );
  console.log(inputsCantidadProducto)
  subtotal = 0
  for (let input of inputsCantidadProducto) {
    subtotal = subtotal + (input.value * Number(input.dataset.precio))
  }
  subtotalEnCarrito.textContent = subtotal
  subtotalEnCheckout.textContent = subtotal
}

  

const recalcularProductosEnCarrito = (nombre) => {
  const productosSeleccionados = document.querySelectorAll(".producto-agregado")
  for (let producto of productosSeleccionados) {
    const nombreProducto = producto.dataset.nombre
    
    if (nombreProducto === nombre) {
      producto.classList.remove("producto-agregado")
    }
  }
  calcularProductosEnCarrito()
}

/* ------------------------------------- CALCULAR TOTAL EN CHECKOUT -------------------------------- */


const recargo = document.querySelector("#recargo")
const descuento = document.querySelector("#descuento")
const envio = document.querySelector("#envio")
const total = document.querySelector("#total")

const indicadorDescuento = document.querySelector(".descuento")
const indicadorEnvio = document.querySelector(".envio")
const indicadorRecargo = document.querySelector(".recargo")

console.log(indicadorDescuento)
const opcionesDePago = document.querySelectorAll(".opcionesDePago")

const efectivo = document.querySelector("#efectivo")
const credito = document.querySelector("#credito")
const envioOpcion = document.querySelector("#envioCheck")
const tarjetaDescuento = document.querySelector("#descuentoCheck")
 


const totalCheckout = () => {
  console.log(subtotalEnCheckout.textContent)
  let subtotalNumero = Number(subtotalEnCheckout.textContent)
  total.textContent = subtotalNumero
  for (let opcion of opcionesDePago) {
    opcion.oninput = () => {
        calcularTotal(subtotalNumero)
    }
  }
}

const calcularTotal = (subtotalNumero) => {
  let totalReal = subtotalNumero
  totalReal = subtotalNumero + recargoTarjeta(subtotalNumero) + recargoEnvio() + aplicarDescuento(subtotalNumero) 
  total.textContent = totalReal
  return totalReal
}

let resultadoRecargo 

const recargoTarjeta = (subtotalNumero) => {
  if (credito.checked) {
    resultadoRecargo = subtotalNumero * 0.1 
    console.log(resultadoRecargo)
    recargo.textContent = resultadoRecargo
    indicadorRecargo.classList.remove("hidden")
  }
else {
    resultadoRecargo = 0
    indicadorRecargo.classList.add("hidden")
  }
    return resultadoRecargo
}

let resultadoEnvio

const recargoEnvio = () => {
  if (envioOpcion.checked) {
    resultadoEnvio =  300
    envio.textContent = resultadoEnvio
    indicadorEnvio.classList.remove("hidden")
  }
  else {
    resultadoEnvio = 0
    indicadorEnvio.classList.add("hidden")
  }
  return resultadoEnvio
}

let resultadoDescuento

const aplicarDescuento = (subtotalNumero) => {
  if (tarjetaDescuento.checked) {
    resultadoDescuento = - subtotalNumero * 0.05
    descuento.textContent = resultadoDescuento
    indicadorDescuento.classList.remove("hidden")
  }
  else {
    resultadoDescuento = 0
    indicadorDescuento.classList.add("hidden")
  }
  return resultadoDescuento
}

