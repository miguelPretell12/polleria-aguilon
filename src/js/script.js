const contenedorCarrito = document.querySelector(".contenedor-menu");
const fondoNegro = document.querySelector(".fondo-negro");
const fechaRight = document.querySelector("#flecha");
const iconocarrito = document.querySelector(".carrito-mostrar");
const cajaCarrito = document.querySelector(".carrito-responsive");
const cantidadCarrito = document.querySelector("#carrito-cantidad");

// Boton Agregar
const btnAgregar = document.querySelectorAll(".btn-agregar");

// Header
const navheader = document.querySelector(".enlace-header");
// Arreglo
let pedidos = [];

cantidadCarrito.textContent = `${pedidos.length}`;

window.addEventListener("scroll", function (e) {
  let scroll = window.scrollY;
  if (scroll > 15) {
    navheader.style.backgroundColor = "#121212";
  } else {
    navheader.style.backgroundColor = "transparent";
  }
});

fondoNegro.addEventListener("click", function (e) {
  fondoNegro.classList.remove("d-block");
  fondoNegro.classList.add("d-none");
  cajaCarrito.classList.remove("mostrar");
  cajaCarrito.classList.add("ocultar");
});

fechaRight.addEventListener("click", function (e) {
  fondoNegro.classList.remove("d-block");
  fondoNegro.classList.add("d-none");
  cajaCarrito.classList.remove("mostrar");
  cajaCarrito.classList.add("ocultar");
});

iconocarrito.addEventListener("click", function (e) {
  e.preventDefault();
  fondoNegro.classList.remove("d-none");
  fondoNegro.classList.add("d-block");
  cajaCarrito.classList.remove("ocultar");
  cajaCarrito.classList.add("mostrar");
});

btnAgregar.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const pedido = {
      img: e.target.parentElement.querySelector("img").src,
      precio: e.target.parentElement.querySelector(".card-info #precio-val")
        .textContent,
      cantidad: 1,
      titulo: e.target.parentElement.querySelector(".card-info .title-card")
        .textContent,
      id: e.target.dataset.id,
    };

    const existe = pedidos.some((p) => p.id == pedido.id);
    if (existe) {
      return;
    } else {
      pedidos = [...pedidos, pedido];
      cantidadCarrito.textContent = `${pedidos.length}`;
    }
    carritoPedido();
  });
});

function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

function carritoPedido() {
  limpiarHTML();
  pedidos.forEach((p) => {
    const { img, precio, id, cantidad, titulo } = p;
    const div = document.createElement("div");
    div.classList.add("carrito-grid");
    div.innerHTML = `
    <img src='${img}' />
    <div class='carrito-info'>
        <div class="text-end">
            <i class="far fa-times-circle btn-eliminar" data-id="${id}" ></i>
        </div>
        <p>${titulo}</p>
        <p class="precio">Precio: <span>${precio}</span></p>
        <p>Cantidad: <input type="number" value="${cantidad}"></p>
    </div>
    `;
    contenedorCarrito.appendChild(div);
  });
  eliminar();
}

function eliminar() {
  const btnEliminar = document.querySelectorAll(".btn-eliminar");
  btnEliminar.forEach((e) => {
    e.addEventListener("click", (p) => {
      pedidos = pedidos.filter((pd) => pd.id != p.target.dataset.id);
      carritoPedido();
    });
  });
}
