//-------------------------FILTROS BSUQUEDA PRODUCTOS-------------------------------//

const filtroBusqueda = document.getElementById('busqueda-usuario')
const productos = document.getElementsByClassName('productos')

//-------FILTRO ESCRITURA----------//
filtroBusqueda.oninput = () => {
    for (let producto of productos) {
            const tarjeta = producto.dataset.nombre;
            const busqueda = filtroBusqueda.value;
        if (tarjeta.includes(busqueda)) {
            
            producto.classList.remove('hidden');
            
        }
        else {
            producto.classList.add('hidden');
            
        }
    }
}

//----------FILTRO POR RATING------------------//

const filtroRating = document.getElementsByClassName('review-filter')


for (let checkbox of filtroRating) {
    checkbox.onclick = () => {
        filtrarPorRating()
    }
}

const filtrarPorRating = () => {
    for (let producto of productos) {
        producto.classList.add('hidden')
        if (checkboxSeleccionado()) {
           if (coinciden(producto)) {
               producto.classList.remove('hidden')
           } 
        } 
        else {
            producto.classList.remove('hidden')
        }
    }
}

const checkboxSeleccionado = () => {
    for (let checkbox of filtroRating) {
      if (checkbox.checked) {
          return true
      }  
    }
} 

const coinciden = (producto) => {
    const rating = producto.dataset.rating
    for (let checkbox of filtroRating) {
        if (checkbox.value === rating && checkbox.checked) {
           return true 
        }
    }

}


//--------------FILTRO POR CATEGORIA----------------//

const filtroCategoria = document.querySelectorAll("input[name='categoria']")


for (let checkbox of filtroCategoria) {
    checkbox.onclick = () => {
        filtrarPorCategoria()
    }
}

const filtrarPorCategoria = () => {
    for (let producto of productos) {
        producto.classList.add('hidden')
        if (checkboxSeleccionadoCategoria()) {
           if (coincidenCategorias(producto)) {
               producto.classList.remove('hidden')
           } 
        } 
        else {
            producto.classList.remove('hidden')
        }
    }
}

const checkboxSeleccionadoCategoria = () => {
    for (let checkbox of filtroCategoria) {
      if (checkbox.checked) {
          return true
      }  
    }
} 

const coincidenCategorias = (producto) => {
    const categoria = producto.dataset.categoria
    for (let checkbox of filtroCategoria) {
        if (checkbox.value === categoria && checkbox.checked) {
           return true 
        }
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

console.log(overlay)

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
const botonVaciar = document.getElementById("boton-vaciar")
const overlayCheckout = document.getElementById("overlay-checkout")
const menuCheckout = document.getElementById("checkout")
const botonSeguirComprando = document.getElementById("seguir")

console.log(botonSeguirComprando)

botonComprar.onclick = () => {
    menuCheckout.classList.remove("hidden")
    overlayCheckout.classList.remove("hidden")
}

botonSeguirComprando.onclick = () => {
    menuCheckout.classList.add("hidden")
    overlayCheckout.classList.add("hidden")
}





