var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
var router = require("./routes") // redirecciona cada endpoint con la funcion que lo resuelve
var database = require("./database/database") // crea el schema de base de datos y lo puebla con datos

database.createModel();

app.use(function(req,resp,next){
    console.log('Petición en:',Date.now(),' Solicita: '+req.path);
    next();
});

app.use("/",router);

//Este método delega en el server.listen "nativo" de Node
var server = app.listen(3000, function () {
   console.log("El servidor express está en el puerto 3000");
});

process.on('SIGINT', () => {
    database.close();
    server.close();
});