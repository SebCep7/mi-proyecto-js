
class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    
    aplicarDescuento(porcentaje) {
        this.precio = this.precio - (this.precio * porcentaje / 100);
    }
}


const producto1 = new Producto(1, "Auriculares", 25000, 10);
const producto2 = new Producto(2, "Mouse", 15000, 20);
const producto3 = new Producto(3, "Teclado", 30000, 5);

const productos = [producto1, producto2, producto3];

producto1.aplicarDescuento(10);
producto2.aplicarDescuento(20);


function mostrarProductos(lista) {
    for (const producto of lista) {
        console.log(
            producto.nombre +
            " - Precio: $" + producto.precio +
            " - Stock: " + producto.stock
        );
    }
}

mostrarProductos(productos);