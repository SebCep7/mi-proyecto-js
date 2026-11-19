
class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

let productos = [];

const formulario = document.querySelector("#formulario");
const contenedor = document.querySelector("#contenedor-productos");
const buscador = document.querySelector("#buscador");
const total = document.querySelector("#total");
const estadoCarga = document.querySelector("#estado-carga");
const botonVaciar = document.querySelector("#vaciar");
const consejo = document.querySelector("#consejo");

function mostrarMensaje(texto, tipo = "success") {
    Swal.fire({
        text: texto,
        icon: tipo,
        timer: 1800,
        showConfirmButton: false
    });
}

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

async function cargarProductos() {
    estadoCarga.textContent = "Cargando productos...";

    try {
        const respuesta = await fetch("./data.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
            throw new Error("Los datos no son válidos");
        }

        const guardados = localStorage.getItem("productos");

        productos = guardados !== null
            ? JSON.parse(guardados) ?? []
            : datos;

        if (!Array.isArray(productos)) {
            throw new Error("Los productos guardados no son válidos");
        }

        mostrarProductos();

        estadoCarga.textContent =
            productos.length + " productos cargados correctamente.";

        mostrarMensaje("Productos cargados con éxito");

    } catch (error) {
        estadoCarga.textContent = "Error al cargar productos.";

        mostrarMensaje(
            "No se pudieron cargar los productos. Intentá de nuevo.",
            "error"
        );

    } finally {
        estadoCarga.dataset.finalizado = "true";
    }
}
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();
    const precio = Number(document.querySelector("#precio").value);
    const stock = Number(document.querySelector("#stock").value);

    if (nombre === "" || precio <= 0 ||
        stock < 0 || !Number.isInteger(stock)) {
        mostrarMensaje("Ingresá datos válidos", "error");
        return;
    }

    const nuevoProducto = new Producto(
        Date.now(), nombre, precio, stock
    );

    productos.push(nuevoProducto);
    guardarProductos();

    buscador.value = "";
    mostrarProductos();
    formulario.reset();

    mostrarMensaje("Producto agregado correctamente");
});

contenedor.addEventListener("click", function(event) {
    const boton = event.target;
    const id = Number(boton.dataset?.id);

    if (boton.classList.contains("eliminar")) {
        productos = productos.filter(producto => producto.id !== id);

        guardarProductos();
        mostrarProductos();

        mostrarMensaje("Producto eliminado correctamente");
    }

    if (boton.classList.contains("guardar-cambios")) {
        const tarjeta = boton.closest(".producto");

        const precio = Number(
            tarjeta.querySelector(".editar-precio").value
        );

        const stock = Number(
            tarjeta.querySelector(".editar-stock").value
        );

        if (precio <= 0 || stock < 0 ||
            !Number.isInteger(stock)) {
            mostrarMensaje("Ingresá valores válidos", "error");
            return;
        }

        const producto = productos.find(p => p.id === id);

        if (producto) {
            producto.precio = precio;
            producto.stock = stock;

            guardarProductos();
            mostrarProductos();

            mostrarMensaje("Cambios guardados correctamente");
        }
    }
});
buscador.addEventListener("input", mostrarProductos);

botonVaciar.addEventListener("click", function() {
    productos = [];

    guardarProductos();
    mostrarProductos();

    mostrarMensaje("La lista quedó vacía");
});

setTimeout(() => {
    consejo.textContent =
        "Consejo: Compará precios antes de realizar una compra.";
}, 3000);

cargarProductos();
