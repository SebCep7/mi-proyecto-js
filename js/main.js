
class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

const productosIniciales = [
    new Producto(1, "Auriculares", 25000, 10),
    new Producto(2, "Mouse", 15000, 20),
    new Producto(3, "Teclado", 30000, 5)
];

const datosGuardados = localStorage.getItem("productos");

let productos = datosGuardados !== null
    ? JSON.parse(datosGuardados) ?? []
    : productosIniciales;


const formulario = document.querySelector("#formulario");
const contenedor = document.querySelector("#contenedor-productos");
const mensaje = document.querySelector("#mensaje");
const buscador = document.querySelector("#buscador");
const total = document.querySelector("#total");
const botonVaciar = document.querySelector("#vaciar");
const consejo = document.querySelector("#consejo");
const botonCargar = document.querySelector("#cargar");
const estadoCarga = document.querySelector("#estado-carga");


function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function limpiarTexto(texto) {
    const elemento = document.createElement("span");
    elemento.textContent = texto;
    return elemento.innerHTML;
}

function mostrarProductos() {
    contenedor.innerHTML = "";

    const busqueda = buscador.value.toLowerCase();

    const filtrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda)
    );

    for (const producto of filtrados) {
        const { id, nombre, precio, stock } = producto;

        contenedor.innerHTML += `
            <div class="producto">
                <h3>${limpiarTexto(nombre)}</h3>
                <p>Precio: $${precio}</p>
                <p>Stock: ${stock}</p>

                <label>
                    Nuevo precio:
                    <input type="number" class="editar-precio"
                        value="${precio}" min="1">
                </label>

                <label>
                    Nuevo stock:
                    <input type="number" class="editar-stock"
                        value="${stock}" min="0">
                </label>

                <button class="guardar-cambios" data-id="${id}">
                    Guardar cambios
                </button>

                <button class="eliminar" data-id="${id}">
                    Eliminar
                </button>
            </div>
        `;
    }

    if (filtrados.length === 0) {
        contenedor.innerHTML = productos.length === 0
            ? "<p>No hay productos cargados.</p>"
            : "<p>No se encontraron productos.</p>";
    }

    actualizarTotal();
}

function actualizarTotal() {
    const resultado = productos.reduce(
        (acumulador, producto) =>
            acumulador + producto.precio * producto.stock, 0
    );

    total.textContent = "Valor total del stock: $" + resultado;
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();
    const precio = Number(document.querySelector("#precio").value);
    const stock = Number(document.querySelector("#stock").value);

    if (nombre === "" || precio <= 0 || stock < 0 ||
        !Number.isInteger(stock)) {
        mensaje.textContent = "Ingresá datos válidos.";
        return;
    }

    const nuevoProducto = new Producto(
        Date.now(), nombre, precio, stock
    );

    productos.push(nuevoProducto);
    guardarProductos();

    buscador.value = "";
    mostrarProductos();

    mensaje.textContent = "Producto agregado correctamente.";
    formulario.reset();
});

contenedor.addEventListener("click", function(event) {
    const boton = event.target;
    const id = Number(boton.dataset?.id);

    if (boton.classList.contains("eliminar")) {
        productos = productos.filter(producto => producto.id !== id);

        guardarProductos();
        mostrarProductos();

        mensaje.textContent = "Producto eliminado correctamente.";
    }

    if (boton.classList.contains("guardar-cambios")) {
        const tarjeta = boton.closest(".producto");

        const precio = Number(
            tarjeta.querySelector(".editar-precio").value
        );

        const stock = Number(
            tarjeta.querySelector(".editar-stock").value
        );

        if (precio <= 0 || stock < 0 || !Number.isInteger(stock)) {
            mensaje.textContent = "Ingresá valores válidos.";
            return;
        }

        const producto = productos.find(p => p.id === id);

        if (producto) {
            producto.precio = precio;
            producto.stock = stock;

            guardarProductos();
            mostrarProductos();

            mensaje.textContent = "Cambios guardados correctamente.";
        }
    }
});

buscador.addEventListener("input", mostrarProductos);

botonVaciar.addEventListener("click", function() {
    productos = [];

    guardarProductos();
    mostrarProductos();

    mensaje.textContent = "La lista quedó vacía.";
});

setTimeout(() => {
    consejo.textContent =
        "Consejo: Compará precios y revisá el stock antes de comprar.";
}, 3000);

// PRE-ENTREGA 9: PROMESA
function obtenerProductos() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Array.isArray(productos)) {
                resolve(productos);
            } else {
                reject(new Error("No se pudieron cargar los productos"));
            }
        }, 1500);
    });
}

async function cargarProductos() {
    botonCargar.disabled = true;
    estadoCarga.textContent = "Cargando productos...";

    try {
        const datos = await obtenerProductos();

        mostrarProductos();

        estadoCarga.textContent =
            datos.length + " productos cargados correctamente.";

    } catch (error) {
        estadoCarga.textContent =
            "No se pudieron cargar los productos. Intentá de nuevo.";

    } finally {
        botonCargar.disabled = false;
    }
}

botonCargar.addEventListener("click", cargarProductos);

mostrarProductos();
