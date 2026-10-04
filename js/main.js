
function calcularSubtotal(precio, cantidad) {
    return precio * cantidad;
}


const calcularDescuento = (subtotal, porcentaje) => {
    return subtotal - (subtotal * porcentaje / 100);
};

const mostrarResultado = function(subtotal, total) {
    alert(
        "Subtotal: $" + subtotal +
        "\nTotal a pagar: $" + total
    );
};

let continuar = true;

while (continuar) {

    const precio = Number(prompt("Ingrese el precio del producto:"));
    const cantidad = Number(prompt("Ingrese la cantidad:"));

    if (precio > 0 && cantidad > 0) {

        const subtotal = calcularSubtotal(precio, cantidad);

        let descuento = 0;

        if (subtotal >= 100000) {
            descuento = 10;
        }

        const total = calcularDescuento(subtotal, descuento);

        mostrarResultado(subtotal, total);

        console.log("Subtotal: $" + subtotal);
        console.log("Descuento: " + descuento + "%");
        console.log("Total: $" + total);

    } else {
        alert("Los valores ingresados no son válidos.");
    }

    const respuesta = prompt(
        "¿Desea realizar otro cálculo? SI / NO"
    );

    if (respuesta === null || respuesta.toLowerCase() !== "si") {
        continuar = false;
    }
}

alert("Calculadora finalizada.");