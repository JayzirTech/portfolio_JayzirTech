let nameEntered
let ageEntered

do {
    nameEntered = prompt("Please, enter your name: ");
} while (!nameEntered)

do {
    ageEntered = prompt(`Welcome ${nameEntered}, this is Jayzir Martinez's WebSite. Please, enter your age: `);
    alert((ageEntered === "" || isNaN(ageEntered) || ageEntered <= 0) ? "Invalid Number" : (ageEntered >= 18) ? "You Are Adult" : "You Are Young")

} while (ageEntered === "" || isNaN(ageEntered) || ageEntered <= 0);
