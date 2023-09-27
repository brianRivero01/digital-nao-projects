// Obtengo el num ingresado
const inputValue = document.getElementById('inputValue');
//Boton de agregar
const addButton = document.getElementById('addButton');
//Resultado
const result = document.getElementById('result');

let total = 0;

addButton.addEventListener('click', function() {
  const value = parseFloat(inputValue.value);
  
  if (!isNaN(value)) {
    total += value;
    result.textContent = total;
  }

  inputValue.value = '';
});
