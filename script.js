function encrypt() {
    var inputText = document.getElementById("inputText").value;
    var outputText = document.getElementById("outputText");

    if (inputText.length === 0) {
        alert("Por favor, ingresa texto antes de encriptar.");
        return;
    }

    var shift = 3; // Cantidad de desplazamiento en el cifrado César

    var encryptedText = "";

    for (var i = 0; i < inputText.length; i++) {
        var charCode = inputText.charCodeAt(i);

        if (charCode >= 65 && charCode <= 90) {
            // Caracter es una letra mayúscula
            encryptedText += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            // Caracter es una letra minúscula
            encryptedText += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
        } else {
            // Caracter no es una letra, se mantiene igual
            encryptedText += inputText.charAt(i);
        }
    }

    outputText.innerHTML = "Texto encriptado: " + encryptedText;
}


function encryptFile() {
    var fileInput = document.getElementById("fileInput");
    var outputText = document.getElementById("outputText");

    if (!fileInput.files || fileInput.files.length === 0) {
        alert("Por favor, selecciona un archivo antes de encriptar.");
        return;
    }

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var content = e.target.result;
        var encryptedContent = encryptText(content);

        // Crea un blob con el contenido encriptado
        var blob = new Blob([encryptedContent], { type: "text/plain" });

        // Crea un enlace de descarga
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "archivo_encriptado.txt"; // Nombre del archivo descargado

        // Agrega el enlace al documento y simula un clic para iniciar la descarga
        document.body.appendChild(link);
        link.click();

        // Remueve el enlace del documento después de la descarga
        document.body.removeChild(link);
    };

    reader.readAsText(file);
}

function encryptText(text) {
    var shift = 3; // Cantidad de desplazamiento en el cifrado César
    var encryptedText = "";

    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);

        if (charCode >= 65 && charCode <= 90) {
            encryptedText += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            encryptedText += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
        } else {
            encryptedText += text.charAt(i);
        }
    }

    return encryptedText;
}
