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

// Objeto
let pedido = {};

// Total
const spanTotal = document.querySelector("#total");

// Cargar localStorage
document.addEventListener("DOMContentLoaded", function () {
  pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  cantidadCarrito.textContent = `${pedidos.length}`;
  carritoPedido();
  totalCarrito();
  d();
});

function d() {
  btnAgregar.forEach((btn) => {
    pedidos.forEach((p) => {
      const { id } = p;
      if (id == btn.dataset.id) {
        btn.classList.remove("fa-plus", "background-red");
        btn.classList.add("fa-check", "background-green");
      }
    });
  });
}

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
      clase1: e.target.classList[2],
      clase2: e.target.classList[3],
    };

    if (e.target.classList.contains("fa-plus")) {
      e.target.classList.remove("fa-plus", "background-red");
      e.target.classList.add("fa-check", "background-green");
      const existe = pedidos.some((p) => p.id == pedido.id);
      if (existe) {
        return;
      } else {
        pedidos = [...pedidos, pedido];
        cantidadCarrito.textContent = `${pedidos.length}`;
      }
    } else {
      e.target.classList.remove("fa-check", "background-green");
      e.target.classList.add("fa-plus", "background-red");

      pedidos = pedidos.filter((pd) => pd.id != e.target.dataset.id);
      cantidadCarrito.textContent = `${pedidos.length}`;
      totalCarrito();
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
  totalCarrito();
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
        <p>Cantidad: <input type="number" class="input-50" min="1" max="10" id="cantidad" data-id="${id}" value="${cantidad}"></p>
    </div>
    `;
    contenedorCarrito.appendChild(div);
  });
  eliminar();
  sincronizarStorage();
  cambiaCantidad();
}

function eliminar() {
  const btnEliminar = document.querySelectorAll(".btn-eliminar");
  btnEliminar.forEach((e) => {
    e.addEventListener("click", (p) => {
      btnAgregar.forEach((btn) => {
        if (btn.dataset.id == p.target.dataset.id) {
          btn.classList.remove("fa-check", "background-green");
          btn.classList.add("fa-plus", "background-red");
        }
      });
      pedidos = pedidos.filter((pd) => pd.id != p.target.dataset.id);
      cantidadCarrito.textContent = `${pedidos.length}`;
      carritoPedido();
      totalCarrito();
    });
  });
}

// LocalStorage
function sincronizarStorage() {
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

function cambiaCantidad() {
  const cantidades = document.querySelectorAll("#cantidad");

  let subtotal;

  cantidades.forEach((cantidad) => {
    cantidad.addEventListener("keyup", function (e) {
      let total = 0;
      if (pedidos.length > 0) {
        pedidos.forEach((pe, a) => {
          if (pe.id == e.target.dataset.id) {
            pe.cantidad = e.target.value;
          }
          subtotal = pe.cantidad * pe.precio;
          total += subtotal;
          for (let i = 0; i < a + 1; i++) {
            if (i == a) {
              spanTotal.textContent = total;
            }
          }
        });
      } else {
        spanTotal.textContent = total;
      }
    });
  });
}

function totalCarrito() {
  let subtotal;
  let total = 0;
  if (pedidos.length > 0) {
    pedidos.forEach((pe, a) => {
      subtotal = pe.cantidad * pe.precio;
      total += subtotal;
      for (let i = 0; i < a + 1; i++) {
        if (i == a) {
          spanTotal.textContent = total;
        }
      }
    });
  } else {
    spanTotal.textContent = total;
  }
}
