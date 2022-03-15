const contenedorCarrito = document.querySelector(".contenedor-menu");
const fondoNegro = document.querySelector(".fondo-negro");
const fechaRight = document.querySelector("#flecha");
const iconocarrito = document.querySelector(".carrito-mostrar");
const cajaCarrito = document.querySelector(".carrito-responsive");

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
