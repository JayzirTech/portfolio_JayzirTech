const nameEntered = prompt("Please, enter your name: ");
let ageEntered;

do{
    ageEntered = prompt(`Welcome ${nameEntered}, this is Jayzir Martinez's WebSite.\n
Please, enter your age: `);
} while(ageEntered === "" || isNaN(ageEntered));

let status = (ageEntered >= 18) ? "Adult" : "Young";
console.log(status);