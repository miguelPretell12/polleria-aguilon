const contenedorCarrito=document.querySelector(".contenedor-menu"),fondoNegro=document.querySelector(".fondo-negro"),fechaRight=document.querySelector("#flecha"),iconocarrito=document.querySelector(".carrito-mostrar"),cajaCarrito=document.querySelector(".carrito-responsive"),cantidadCarrito=document.querySelector("#carrito-cantidad"),btnAgregar=document.querySelectorAll(".btn-agregar"),navheader=document.querySelector(".enlace-header");let pedidos=[],pedido={};const spanTotal=document.querySelector("#total");function d(){btnAgregar.forEach(t=>{pedidos.forEach(e=>{const{id:a}=e;a==t.dataset.id&&(t.classList.remove("fa-plus","background-red"),t.classList.add("fa-check","background-green"))})})}function limpiarHTML(){for(;contenedorCarrito.firstChild;)contenedorCarrito.removeChild(contenedorCarrito.firstChild)}function carritoPedido(){limpiarHTML(),totalCarrito(),pedidos.forEach(t=>{const{img:e,precio:a,id:r,cantidad:o,titulo:d}=t,i=document.createElement("div");i.classList.add("carrito-grid"),i.innerHTML=`\n    <img src='${e}' />\n    <div class='carrito-info'>\n        <div class="text-end">\n            <i class="far fa-times-circle btn-eliminar" data-id="${r}" ></i>\n        </div>\n        <p>${d}</p>\n        <p class="precio">Precio: <span>${a}</span></p>\n        <p>Cantidad: <input type="number" class="input-50" min="1" max="10" id="cantidad" data-id="${r}" value="${o}"></p>\n    </div>\n    `,contenedorCarrito.appendChild(i)}),eliminar(),sincronizarStorage(),cambiaCantidad()}function eliminar(){document.querySelectorAll(".btn-eliminar").forEach(t=>{t.addEventListener("click",t=>{btnAgregar.forEach(e=>{e.dataset.id==t.target.dataset.id&&(e.classList.remove("fa-check","background-green"),e.classList.add("fa-plus","background-red"))}),pedidos=pedidos.filter(e=>e.id!=t.target.dataset.id),cantidadCarrito.textContent=""+pedidos.length,carritoPedido(),totalCarrito()})})}function sincronizarStorage(){localStorage.setItem("pedidos",JSON.stringify(pedidos))}function cambiaCantidad(){let t;document.querySelectorAll("#cantidad").forEach(e=>{e.addEventListener("keyup",(function(e){let a=0;pedidos.length>0?pedidos.forEach((r,o)=>{r.id==e.target.dataset.id&&(r.cantidad=e.target.value),t=r.cantidad*r.precio,a+=t;for(let t=0;t<o+1;t++)t==o&&(spanTotal.textContent=a)}):spanTotal.textContent=a}))})}function totalCarrito(){let t,e=0;pedidos.length>0?pedidos.forEach((a,r)=>{t=a.cantidad*a.precio,e+=t;for(let t=0;t<r+1;t++)t==r&&(spanTotal.textContent=e)}):spanTotal.textContent=e}document.addEventListener("DOMContentLoaded",(function(){pedidos=JSON.parse(localStorage.getItem("pedidos"))||[],cantidadCarrito.textContent=""+pedidos.length,carritoPedido(),totalCarrito(),d()})),window.addEventListener("scroll",(function(t){let e=window.scrollY;navheader.style.backgroundColor=e>15?"#121212":"transparent"})),fondoNegro.addEventListener("click",(function(t){fondoNegro.classList.remove("d-block"),fondoNegro.classList.add("d-none"),cajaCarrito.classList.remove("mostrar"),cajaCarrito.classList.add("ocultar")})),fechaRight.addEventListener("click",(function(t){fondoNegro.classList.remove("d-block"),fondoNegro.classList.add("d-none"),cajaCarrito.classList.remove("mostrar"),cajaCarrito.classList.add("ocultar")})),iconocarrito.addEventListener("click",(function(t){t.preventDefault(),fondoNegro.classList.remove("d-none"),fondoNegro.classList.add("d-block"),cajaCarrito.classList.remove("ocultar"),cajaCarrito.classList.add("mostrar")})),btnAgregar.forEach(t=>{t.addEventListener("click",(function(t){const e={img:t.target.parentElement.querySelector("img").src,precio:t.target.parentElement.querySelector(".card-info #precio-val").textContent,cantidad:1,titulo:t.target.parentElement.querySelector(".card-info .title-card").textContent,id:t.target.dataset.id,clase1:t.target.classList[2],clase2:t.target.classList[3]};if(t.target.classList.contains("fa-plus")){t.target.classList.remove("fa-plus","background-red"),t.target.classList.add("fa-check","background-green");if(pedidos.some(t=>t.id==e.id))return;pedidos=[...pedidos,e],cantidadCarrito.textContent=""+pedidos.length}else t.target.classList.remove("fa-check","background-green"),t.target.classList.add("fa-plus","background-red"),pedidos=pedidos.filter(e=>e.id!=t.target.dataset.id),cantidadCarrito.textContent=""+pedidos.length,totalCarrito();carritoPedido()}))});