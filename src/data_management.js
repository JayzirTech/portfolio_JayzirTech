let inventoryMap = new Map([
    [
        1001, {
            name: "Cuaderno Rayado 100H",
            pryce: 5500,
            category: "Papelería"
        }],
    [
        1002, {
            name: "Caja de Colores x24",
            pryce: 12000,
            category: "Papelería"
        }],
    [
        2002, {
            name: "Resaltador Fluorescente",
            pryce: 2800,
            category: "Útiles de Oficina"
        }],
    [
        3001, {
            name: "Cartulina de Colores",
            pryce: 800,
            category: "Manualidades"
        }],
    [
        3002, {
            name: "Silicona Líquida 250ml",
            pryce: 8500,
            category: "Manualidades"
        }],
    [
        2001, {
            name: "Pegante en Barra 40g",
            pryce: 3500,
            category: "Útiles de Oficina"
        }],
    [
        4001, {
            name: "Carpeta de Presentación",
            pryce: 1500,
            category: "Archivo"
        }],
    [
        4002, {
            name: "Ganchos Legajadores x20",
            pryce: 2200,
            category: "Archivo"
        }],
    [
        5001, {
            name: "Calculadora Científica",
            pryce: 45000,
            category: "Tecnología"
        }],
    [
        5002, {
            name: "Memoria USB 64GB",
            pryce: 28000,
            category: "Tecnología"
        }]
]);

/**
 * Control de Navegación de Secciones
 * Esta función se encarga de mostrar solo una "pantalla" a la vez.
 */
function showSection(sectionId) {
    const mainMenu = document.getElementById('mainMenu');
    const textSelect = document.getElementById('selectOption');
    const buttonToBack = document.getElementById('buttonToBack');

    mainMenu.style.display = 'none';
    textSelect.style.display = 'none';
    buttonToBack.style.display = 'none';

    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');

        // Buscamos el formulario de la sección que se está ocultando
        const form = section.querySelector('form');
        if (form) {
            form.reset(); // Restablece los valores a vacío
        }

        // CONTROL CRÍTICO: Desbloquear los campos de exclusión mutua al salir
        const searchFields = section.querySelectorAll('.search-field');
        searchFields.forEach(f => {
            f.disabled = false;
            f.style.opacity = "1";
            f.style.cursor = "auto";
        });
    });

    // Restablecer el texto idéntico al del HTML original
    const pText = document.getElementById("placeholderText");
    if (pText) {
        pText.innerHTML = `Enter details to see results.`;
    }

    // Desactivar el scroll (wheel) en las entradas numéricas para evitar cambios accidentales
    document.addEventListener('wheel', function () {
        if (document.activeElement.type === 'number') {
            document.activeElement.blur();
        }
    });

    // Mostrar sección destino
    if (sectionId === 'mainMenu') {
        if (mainMenu) {
            mainMenu.style.display = 'flex';
            textSelect.style.display = 'block'
            buttonToBack.style.display = 'block';
        }
    } else {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
}

/**
 * Control UI: Exclusión mutua de campos de búsqueda
 */
const searchFields = document.querySelectorAll('.search-field');

searchFields.forEach(field => {
    field.addEventListener('input', () => {
        const hasValue = field.value.trim() !== "";

        if (hasValue) {
            // Deshabilitar los demás campos
            searchFields.forEach(otherField => {
                if (otherField !== field) {
                    otherField.disabled = true;
                    otherField.style.opacity = "0.5";
                    otherField.style.cursor = "not-allowed";
                }
            });
        } else {
            // CONTROL: Verificar si de verdad TODOS están vacíos antes de habilitar
            const allEmpty = Array.from(searchFields).every(f => f.value.trim() === "");
            if (allEmpty) {
                searchFields.forEach(f => {
                    f.disabled = false;
                    f.style.opacity = "1";
                    f.style.cursor = "auto";
                });
            }
        }
    });
});