const nameEntered = prompt("Please, enter your name: ");
let ageEntered;

do {
    ageEntered = prompt(`Welcome ${nameEntered}, this is Jayzir Martinez's WebSite. Please, enter your age: `);
    alert((ageEntered === "" || isNaN(ageEntered) || ageEntered <= 0) ? "Invalid Number" : (ageEntered >= 18) ? "You Are Adult" : "You Are Young")

} while (ageEntered === "" || isNaN(ageEntered) || ageEntered <= 0);

