//Variable declaration
let nameEntered
let ageEntered

//Asks for the username. If you don't enter it, it asks for it again.
do {
    nameEntered = prompt("Please, enter your name:").trim();
} while (!nameEntered)

//Asks for the user's age.
//If the user enters an invalid number (nothing, text, or a decimal), it asks again.
do {
    ageEntered = prompt(`Welcome ¡${nameEntered}!, this is Jayzir Martinez's WebSite. Please, enter your age:`);

    (isNaN(ageEntered) || ageEntered <= 0 || !Number.isInteger(Number(ageEntered))) ? console.error("Error: Please, Enter a valid age number.") : (ageEntered >= 18) ? console.log("You Are Adult") : console.log("You Are Young")

} while (isNaN(ageEntered) || ageEntered <= 0 || !Number.isInteger(Number(ageEntered)));