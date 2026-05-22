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

const textIDVerification = document.getElementById('IDVerification');
const textNameVerification = document.getElementById('nameVerification');

// Función para mostrar secciones de registro y búsqueda
function showSection(form) {
    const registerForm = document.getElementById('registerSection');
    const searchForm = document.getElementById('searchSection');
    const menu = document.getElementById('mainMenu');
    const textSelectOption = document.getElementById('textSelectOption');
    const buttonToHome = document.getElementById('buttonToBack');

    menu.style.display = 'none';
    textSelectOption.style.display = 'none';
    buttonToHome.style.display = 'none';

    if (form === 'registerSection') registerForm.classList.add('active');

    if (form === 'searchSection') searchForm.classList.add('active');

    if (form === 'mainMenu') {
        menu.style.display = 'flex';
        textSelectOption.style.display = 'block';
        buttonToHome.style.display = 'block';
        registerForm.classList.remove('active');
        searchForm.classList.remove('active');

        inputProductForm.reset();

        textIDVerification.innerText = '';
        textNameVerification.innerText = '';
    }
}

// Lógica para bloquear el envío si el ID ya está registrado
const inputProdID = document.getElementById('prodID');

inputProdID.addEventListener('input', () => {

    if ((inputProdID.value).length === 4 && inputProdName) {
        const ids = new Set(inventoryMap.keys());

        if (ids.has(Number(inputProdID.value))) {

            textIDVerification.innerText = '❌ ID not available';

            submitButtonEnabler(true);
        }

    } else {
        textIDVerification.innerText = '';

        submitButtonEnabler(false);
    }

});

// Lógica para bloquear el envío si el nombre ya está registrado
const inputProdName = document.getElementById('prodName');

inputProdName.addEventListener('input', () => {

    const names = new Set();

    inventoryMap.forEach(product => { names.add((product.name.trim()).toLocaleLowerCase()) });

    if (names.has(((inputProdName.value).trim()).toLocaleLowerCase())) {

        textNameVerification.innerText = '❌ Product name already exists';
        submitButtonEnabler(true);

    } else {

        textNameVerification.innerText = '';
        submitButtonEnabler(false);
    };

});

// Función para habilita y deshabilitar el botón de envío
function submitButtonEnabler(confirmation) {
    const buttonSubmit = document.getElementById('buttonSubmitSaveProduct');

    if (confirmation === true) {
        buttonSubmit.disabled = true;

        buttonSubmit.style.backgroundColor = '#a39385';
        buttonSubmit.style.cursor = 'not-allowed';
        buttonSubmit.style.opacity = '0.6';
    } else {
        buttonSubmit.disabled = false;

        buttonSubmit.style.backgroundColor = '';
        buttonSubmit.style.cursor = 'pointer'
        buttonSubmit.style.opacity = '1';
    }
}

// Lógica para registro de envío
const inputProductForm = document.getElementById('productForm');

inputProductForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputProdPrice = document.getElementById('prodPrice');
    const inputProdCategory = document.getElementById('prodCategory');

    inventoryMap.set(Number(inputProdID.value), {
        name: inputProdName.value,
        price: Number(inputProdPrice.value), 
        category: inputProdCategory.value
    });

    console.log(inventoryMap);

    showSection('mainMenu');

});