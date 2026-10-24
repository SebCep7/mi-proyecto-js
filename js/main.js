
class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    aplicarDescuento(porcentaje) {
        this.precio -= this.precio * porcentaje / 100;
    }
}


const productos = [
    new Producto(1, "Auriculares", 25000, 10),
    new Producto(2, "Mouse", 15000, 20),
    new Producto(3, "Teclado", 30000, 5),
    new Producto(4, "Monitor", 150000, 0),
    new Producto(5, "Webcam", 45000, 8)
];


function mostrarProductos(lista) {
    for (const producto of lista) {
        console.log(producto.nombre + " - $" + producto.precio);
    }
}

let continuar = true;

while (continuar) {
    const opcion = prompt(
        "CALCULADORA DE COMPRAS\n" +
        "1. Buscar producto\n" +
        "2. Ver productos disponibles\n" +
        "3. Calcular valor del stock\n" +
        "4. Salir"
    );

    if (opcion === "1") {
        const nombre = prompt("Ingrese el nombre del producto:");

        const encontrado = productos.find(
            producto => producto.nombre.toLowerCase() === nombre?.toLowerCase()
        );

        if (encontrado) {
            alert(encontrado.nombre + " - $" + encontrado.precio);
            console.log(encontrado);
        } else {
            alert("Producto no encontrado");
        }

    } else if (opcion === "2") {
        const disponibles = productos.filter(
            producto => producto.stock > 0
        );

        mostrarProductos(disponibles);

        alert("Productos disponibles: " + disponibles.length);

    } else if (opcion === "3") {
        const total = productos.reduce(
            (acumulador, producto) =>
                acumulador + producto.precio * producto.stock, 0
        );

        alert("Valor total del stock: $" + total);
        console.log("Total del stock: $" + total);

    } else if (opcion === "4" || opcion === null) {
        continuar = false;

    } else {
        alert("Opción no válida");
    }
}

alert("Gracias por utilizar la calculadora");