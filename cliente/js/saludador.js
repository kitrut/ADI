//Archivo "saludador.js"
var saludos = ["¡Hola!", "Yiiiha!", "¿Cómo estás?", "Buenaaaas"]

function saludar() {
    var pos = Math.floor(Math.random()*saludos.length)
    return saludos[pos]
}

export {saludar}
