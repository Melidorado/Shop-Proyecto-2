//-------------------------FILTROS BUSQUEDA PRODUCTOS-------------------------------//

const filtroBusqueda = document.getElementById('busqueda-usuario')
const productos = document.getElementsByClassName('productos')
const filtroRating = document.getElementsByClassName('review-filter')
const filtroCategoria = document.querySelectorAll("input[name='categoria']")

//--------------FILTRO POR CATEGORIA----------------//

for (let checkbox of filtroCategoria) {
    checkbox.oninput = () => {
        filtrarTarjetas()
    }
}

//-------FILTRO ESCRITURA----------//
filtroBusqueda.oninput = () => {
    filtrarTarjetas()
}


//----------FILTRO POR RATING------------------//


for (let checkbox of filtroRating) {
    checkbox.oninput = () => {
        filtrarTarjetas()
    }
}



const filtrarTarjetas = () => {
    for (let producto of productos) {
        if (pasaFiltros(producto)) {
            mostrarTarjetas(producto)
        }
        else {
            ocultarTarjetas(producto)
        }
    }
}

const mostrarTarjetas = (producto) => {
    return producto.classList.remove("hidden")
}

const ocultarTarjetas = (producto) => {
    return producto.classList.add("hidden")
}


const hayAlgunaCategoriaChequeada = () => {
    for (let checkbox of filtroCategoria) {
        if (checkbox.checked) {
            return true
        }
    }
    return false
}

const hayAlgunRatingSeleccionado = () => {
    for (let checkbox of filtroRating) {
        if (checkbox.checked) {
            return true
        }
    }
    return false
}

const hayAlgoEscritoEnInput = () => {
    return Boolean(filtroBusqueda.value)
}



const coincideBusquedaInputConTarjeta = (producto) => {
    const nombreTarjeta = producto.dataset.nombre
    const busquedaUsuario = filtroBusqueda.value.toLowerCase()
    
    if (nombreTarjeta.includes(busquedaUsuario)) {
        return true
    }
    else {
        return false
    }
}

const coincideCategoriaConTarjeta = (producto) => {
    for (let checkbox of filtroCategoria) {
        if (checkbox.value === producto.dataset.categoria && checkbox.checked) {
            return true
        }
    }
    return false
}

const coincideRatingConTarjeta = (producto) => {
    for (let checkbox of filtroRating) {
        if (checkbox.value === producto.dataset.rating && checkbox.checked) {
            return true
        }
       
    }
    return false
}


const filtroInputEscrito = (producto) => {
    if (hayAlgoEscritoEnInput()) {
        return coincideBusquedaInputConTarjeta(producto)
    }
    else {
        return true
    }
}


const filtroCategoriaSeleccionada = (producto) => {
    if (hayAlgunaCategoriaChequeada()) {
        return coincideCategoriaConTarjeta(producto)
    }
    else {
        return true
    }
}

const filtroRatingSeleccionado = (producto) => {
    if (hayAlgunRatingSeleccionado()) {
        return coincideRatingConTarjeta(producto)
    }
    else {
        return true
    }
}

const pasaFiltros = (producto) => {

    if (filtroInputEscrito(producto)== true && filtroCategoriaSeleccionada(producto) == true && filtroRatingSeleccionado(producto)== true) {
        return true
    }
    else {
        return false
    }
}


//------------BOTON LIMPIAR FILTROS--------------------//

const limpiar = document.querySelector('.limpiar')


const limpiarFiltroBusqueda = limpiar.onclick = () => {
        filtroBusqueda.value = ""
        for (let producto of productos) {
            producto.classList.remove('hidden')
        }
        for (let checkbox of filtroRating) {
            checkbox.checked = false
        }
        for (let checkbox of filtroCategoria) {
            checkbox.checked = false
        }
}


//---------------------------------------- CARRITO DE COMPRAS LATERAL ---------------------------------------------------//

const botonCarrito = document.getElementById("carrito")
const botonCerrarMenu = document.getElementById("cerrar")
const menuLateral = document.getElementById("carrito-lateral")
const overlay = document.getElementById("overlay")



botonCarrito.onclick = () => {
    menuLateral.classList.add("mostrar-menu")
    overlay.classList.remove("hidden")
    document.body.classList.add("no-scroll")
}

botonCerrarMenu.onclick = () => {
    menuLateral.classList.remove("mostrar-menu")
    overlay.classList.add("hidden")
    document.body.classList.remove("no-scroll")
}

//-------------------------------------- CHECKOUT COMPRAS --------------------------------------------------//

const botonComprar = document.getElementById("boton-comprar")
const overlayCheckout = document.getElementById("overlay-checkout")
const menuCheckout = document.getElementById("checkout")
const botonSeguirComprando = document.getElementById("seguir")



botonComprar.onclick = () => {
    menuCheckout.classList.remove("hidden")
    overlayCheckout.classList.remove("hidden")
}

botonSeguirComprando.onclick = () => {
    menuCheckout.classList.add("hidden")
    overlayCheckout.classList.add("hidden")
}

//-------------------------------------- ALERT VACIAR CARRITO -----------------------------------------------//

const botonVaciar = document.getElementById("boton-vaciar")
const botonCancelar = document.getElementById("cancelar-vaciar")
const botonConfirmarVaciar = document.getElementById("vaciar")
const overlayVaciar = document.getElementById("overlay-vaciar")
const alertVaciar = document.getElementById("alert-vaciar")

const indicadorCantProductos = document.getElementById("indicador-cantidad-productos")
const subYBotones = document.getElementById("contenedor-subtotal-botones")


botonVaciar.onclick = () => {
    overlayVaciar.classList.remove("hidden")
    alertVaciar.classList.remove("hidden")
}

botonCancelar.onclick = () => {
    overlayVaciar.classList.add("hidden")
    alertVaciar.classList.add("hidden")
}

botonConfirmarVaciar.onclick = () => {
    overlayVaciar.classList.add("hidden")
    alertVaciar.classList.add("hidden")
    indicadorCantProductos.textContent = "No tienes productos en el carrito, ¡agrega algunos!"
    subYBotones.classList.add("hidden")
}


//-------------------------------------- CAMBIAR DE GRILLA A LISTA O VICEVERSA -----------------------------------------------//
const botonGrilla = document.getElementById("grilla")
const botonLista = document.getElementById("lista")
const descripcionesIndividualesProductos = document.querySelectorAll("#descripcion-producto")

const contenedorProductos = document.querySelector("#grilla-o-lista")

const tarjetas = document.getElementsByClassName("productos")
const contenedoresImagenes = document.getElementsByClassName("contenedor-imagen")
const descripcionesProductos = document.getElementsByClassName("descripcion")
const botonesComprar = document.getElementsByClassName("boton-comprar-tarj")
const precios = document.getElementsByClassName("precio")


botonLista.onclick = () => {
    contenedorProductos.classList.remove("grilla")
    contenedorProductos.classList.add("lista")
}

botonGrilla.onclick = () => {
    contenedorProductos.classList.remove("lista")
    contenedorProductos.classList.add("grilla")
    
}


