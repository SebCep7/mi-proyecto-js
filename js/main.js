
const productos = [
    "Auriculares",
    "Cargador",
    "Funda",
    "Mouse",
    "Teclado"
];

// Agregar productos
productos.push("Cable HDMI");
productos.unshift("Notebook");

// Eliminar el último producto
const productoEliminado = productos.pop();

alert("Se ha eliminado el elemento: " + productoEliminado);


const productoBuscado = prompt("¿Qué producto querés buscar?");

if (productos.includes(productoBuscado)) {

    const posicion = productos.indexOf(productoBuscado);

    alert(
        productoBuscado +
        " está disponible en la posición " +
        posicion
    );

} else {

    alert(productoBuscado + " no está disponible");

}

productos.splice(2, 1, "USB");


function mostrarProductos(lista) {

    console.log("--- PRODUCTOS DISPONIBLES ---");

    for (const producto of lista) {
        console.log("Producto: " + producto);
    }

    console.log("Total de productos: " + lista.length);
}

mostrarProductos(productos);