//Variable declaration
let nameEntered
let ageEntered

const invalidNumber = "Error: Please, Enter a valid age number."

//Asks for the username. If you don't enter it, it asks for it again.
do {
    nameEntered = prompt("Please, enter your name:").trim();
} while (!nameEntered)

let minorThan18 = `Hello ${nameEntered}, you are under 18. Keep learning and enjoying coding!`
let majorThan18 = `Hello ${nameEntered}, You are of legal age. Get ready for great opportunities in the world of programming!`

//Asks for the user's age.
//If the user enters an invalid number (nothing, text, or a decimal), it asks again.
do {
    ageEntered = prompt(`Welcome ¡${nameEntered}!, this is Jayzir Martinez's WebSite. Please, enter your age:`);

    (ageEntered <= 0 || !Number.isInteger(Number(ageEntered))) ? console.error(invalidNumber) : (ageEntered >= 18) ? console.log(majorThan18) : console.warn(minorThan18)

} while (ageEntered <= 0 || !Number.isInteger(Number(ageEntered)));