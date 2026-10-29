class Producto {
  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  aplicarDescuento(porcentaje) {
    this.precio -= (this.precio * porcentaje) / 100;
  }
}

const productos = [
  new Producto(1, "Auriculares", 25000, 10),
  new Producto(2, "Mouse", 15000, 20),
  new Producto(3, "Teclado", 30000, 5),
];


const formulario = document.querySelector("#formulario");
const contenedor = document.querySelector("#contenedor-productos");
const mensaje = document.querySelector("#mensaje");
const buscador = document.querySelector("#buscador");
const total = document.querySelector("#total");

function mostrarProductos(lista) {
  contenedor.innerHTML = "";

  for (const producto of lista) {
    contenedor.innerHTML += `
            <div class="producto">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Stock: ${producto.stock}</p>
                <button class="eliminar" data-id="${producto.id}">
                    Eliminar
                </button>
            </div>
        `;
  }

  actualizarTotal();
}

function actualizarTotal() {
  const resultado = productos.reduce(
    (acumulador, producto) => acumulador + producto.precio * producto.stock,
    0,
  );

  total.textContent = "Valor total del stock: $" + resultado;
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.querySelector("#nombre").value.trim();
  const precio = Number(document.querySelector("#precio").value);
  const stock = Number(document.querySelector("#stock").value);

  if (nombre === "" || precio <= 0 || stock < 0) {
    mensaje.textContent = "Ingresá datos válidos.";
    return;
  }

  const nuevoProducto = new Producto(Date.now(), nombre, precio, stock);

  productos.push(nuevoProducto);

  mostrarProductos(productos);
  buscador.value = "";

  mensaje.textContent = "Producto agregado correctamente.";

  formulario.reset();
});

contenedor.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminar")) {
    const id = Number(event.target.dataset.id);

    const indice = productos.findIndex((producto) => producto.id === id);

    if (indice !== -1) {
      productos.splice(indice, 1);
      mostrarProductos(productos);
      buscador.value = "";
      mensaje.textContent = "Producto eliminado correctamente.";
    }
  }
});

buscador.addEventListener("input", function () {
  const texto = buscador.value.toLowerCase();

  const filtrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(texto),
  );

  mostrarProductos(filtrados);
});

mostrarProductos(productos);
