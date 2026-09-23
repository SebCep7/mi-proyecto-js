let continuar = "si";
let personasConsultadas = 0;

while (continuar === "si") {

    const nombre = prompt("Ingresá tu nombre:");
    const edad = parseInt(prompt("Ingresá tu edad:"));

    if (edad >= 18) {
        alert("Hola " + nombre + ", podés ingresar al evento.");
    } else if (edad >= 16) {
        alert("Hola " + nombre + ", podés ingresar acompañado por un adulto.");
    } else {
        alert("Hola " + nombre + ", no podés ingresar al evento.");
    }

    personasConsultadas = personasConsultadas + 1;

    continuar = prompt("¿Querés consultar otra persona? Escribí si o no.");
}

alert("Simulador finalizado. Personas consultadas: " + personasConsultadas);

console.log("Simulador finalizado.");
console.log("Personas consultadas: " + personasConsultadas);