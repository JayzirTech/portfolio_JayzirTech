// Seleccionamos todos los enlaces de la navegación que tengan un '#'
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const backToTopButton = document.getElementById("GoToTop");
const sideMenu = document.getElementById("sideMenu");

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        // 1. Evitamos el comportamiento por defecto (que recarga o salta bruscamente)
        e.preventDefault();

        // 2. Obtenemos el ID de la sección a la que queremos ir
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // 3. Si la sección existe, nos desplazamos suavemente
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mostrar el botón cuando el usuario baja 300px desde el tope
window.onscroll = function () {
    const scrollPos = document.body.scrollTop > 300 || document.documentElement.scrollTop > 300;

    if (scrollPos) {
        sideMenu.classList.add("visible");
        backToTopButton.classList.add("visible");
    } else {
        sideMenu.classList.remove("visible");
        backToTopButton.classList.remove("visible");
    }
};

// Al hacer clic, sube suavemente
backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});