const nameEntered = prompt("Please, enter your name: ");
const ageEntered = null

do{
    ageEntered = prompt(`Bienvenid@ ${nameEntered}, esta es la WebSite de Jayzir Martinez.\nPlease, enter your age: `);
    let age = Number.isInteger(ageEntered);
} while(isNaN(age))

let age = 15;
let status = (age >= 18) ? "Adult" : "Young";
console.log(status);