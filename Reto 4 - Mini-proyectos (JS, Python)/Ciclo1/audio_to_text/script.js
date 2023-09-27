// Verificar si el navegador es compatible con el reconocimiento de voz
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    const startButton = document.getElementById('startButton');
    const result = document.getElementById('result');

    recognition.continuous = false; //resultados de forma continua 
    recognition.interimResults = false; //resultados temporales miestras se procesa 
    recognition.lang = 'es-ES'; // Idioma para el reconocimiento (ejemplo: español)

    recognition.onresult = function (event) { //Metodo que se ejecuta cuando reconoció audio
        const transcript = event.results[0][0].transcript; //Transcripción
        const numbers = extractNumbers(transcript); //Extrae números del texto 
        const text = convertNumbersToText(numbers); //Convierte los números a texto 
        result.textContent = text;
    };

    recognition.onerror = function (event) { //Se ejecuta cuando no se haya escuchado algo, por ej.
        console.error('Error en el reconocimiento de voz: ', event.error);
    };

    startButton.addEventListener('click', function () {
        recognition.start(); //Se comienza a escuchar
    });
}

else {
    alert('El reconocimiento de voz no es compatible en este navegador.');
}

function extractNumbers(text) {
    // Utiliza una expresión regular para extraer los números del texto
    const numbers = text.match(/\d+/g);
    return numbers ? numbers.map(Number) : [];
}

function convertNumbersToText(numbers) {
    const numberWords = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const textArray = numbers.map(num => {
      if (num >= 0 && num <= 9) {
        return numberWords[num];
      } else {
        return 'El rango disponible para mostrar el número en palabras es del 0 al 9.';
      }
    });
    return textArray.join(' ');
}
  