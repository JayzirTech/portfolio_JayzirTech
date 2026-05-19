let inventoryMap = new Map([
    [1001, { name: "Cuaderno Rayado 100H", price: 5500, category: "Stationery" }],
    [1002, { name: "Caja de Colores x24", price: 12000, category: "Stationery" }],
    [2002, { name: "Resaltador Fluorescente", price: 2800, category: "Office supplies" }],
    [3001, { name: "Cartulina de Colores", price: 800, category: "Crafts" }],
    [3002, { name: "Silicona Líquida 250ml", price: 8500, category: "Crafts" }],
    [2001, { name: "Pegante en Barra 40g", price: 3500, category: "Office supplies" }],
    [4001, { name: "Carpeta de Presentación", price: 1500, category: "Others" }],
    [4002, { name: "Ganchos Legajadores x20", price: 2200, category: "Others" }],
    [5001, { name: "Calculadora Científica", price: 45000, category: "Technology" }],
    [5002, { name: "Memoria USB 64GB", price: 28000, category: "Technology" }]
]);

const buttonSumit = document.getElementById('buttonSubmitSaveProduct');
const existingIDMessage = document.getElementById('IDVrification');
const productForm = document.getElementById('productForm');

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

            existingIDMessage.style.display = 'none';

            buttonSumit.disabled = false;
            buttonSumit.style.opacity = "1";
            buttonSumit.style.cursor = "auto";
        }

        // CONTROL CRÍTICO: Desbloquear campos de búsqueda y select al salir
        const activeSearchFields = section.querySelectorAll('#searchForm input, #searchForm select');
        activeSearchFields.forEach(f => {
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

    // Mostrar sección destino
    if (sectionId === 'mainMenu') {
        if (mainMenu) {
            mainMenu.style.display = 'flex';
            textSelect.style.display = 'block';
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
 * Selecciona tanto inputs con clase como select internos del contenedor del buscador
 */
const searchFields = document.querySelectorAll('#searchForm input, #searchForm select');

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

// Seleccionamos el input por su ID
const inputID = document.getElementById('prodID');

// Le plantamos el "escuchador" del evento 'input'
inputID.addEventListener('input', (event) => {
    // Capturamos el valor actual que tiene el campo
    const actualValue = event.target.value;

    // Verifica si el ID ya existe
    if (actualValue.length === 4) {

        // inventoryMap.keys() toma todos los IDs del mapa y los hereda al Set automáticamente
        const registeredIDs = new Set(inventoryMap.keys());

        if (registeredIDs.has(parseInt(actualValue, 10))) {

            existingIDMessage.style.display = 'block';

            buttonSumit.disabled = true;
            buttonSumit.style.opacity = "0.5";
            buttonSumit.style.cursor = "not-allowed";
        }
    } else {
        existingIDMessage.style.display = 'none';

        buttonSumit.disabled = false;
        buttonSumit.style.opacity = "1";
        buttonSumit.style.cursor = "auto";
    }
});

/**
 * Control lógico: Envío y Guardado del Formulario de Registro
 */
productForm.addEventListener('submit', (event) => {
    // Evita la recarga inmediata de la página para no perder el mapa en memoria
    event.preventDefault(); 

    // Capturamos y formateamos los valores ingresados por el usuario
    const id = parseInt(document.getElementById('prodID').value, 10);
    const name = document.getElementById('prodName').value.trim();
    const price = parseFloat(document.getElementById('prodPrice').value);
    const category = document.getElementById('prodCategory').value;

    // Guardamos el nuevo producto dentro del Map estructural
    inventoryMap.set(id, {
        name: name,
        price: price,
        category: category
    });

    alert("✨ Product successfully registered!");

    // Reseteamos el formulario y regresamos al menú principal de manera limpia
    productForm.reset();
    showSection('mainMenu');
    console.table(inventoryMap)
});