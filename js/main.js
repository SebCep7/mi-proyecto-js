

const nombre = prompt("¿Cuál es tu nombre?");
const edad = parseInt(prompt("¿Cuántos años tenés?"));
const ciudad = prompt("¿En qué ciudad vivís?");


const edadEnCincoAnios = edad + 5;


const mensaje = "Hola " + nombre + 
    ", vivís en " + ciudad + 
    " y en cinco años vas a tener " + 
    edadEnCincoAnios + " años.";


console.log(mensaje);
alert(mensaje);