
//Cargamos el módulo express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
//lista de puntos
var lista;
var idActual = 1;
var errors =[{code:1,message:"Error desconocido"},{code:2,message:"El item no existe"},{code:3,message:"El id debería ser numerico"}]
var TypePoint=["Semáforo acústico","Rampa discapacitados","Servicio adaptado"];
var Point = {
    id:0,
    name:" ",
    coordX:0,
    coordY:0,
    coordZ:0,
    type:TypePoint[1],
    where:function(){
        return this.coordX+","+this.coordY;
    }
}

app.use(function(req,resp,next){
    console.log('Petición en:',Date.now());
    next();
});
//En Express asociamos un método HTTP y una URL con un callback a ejecutar
app.get('/', function(pet,resp) {
   //Tenemos una serie de primitivas para devolver la respuesta HTTP
   resp.status(200);
   resp.send('Hola soy Express'); 
});

app.route('/api/type/:id')
    .get(function(req,resp){
        var idBuscado = parseInt(req.params.id);
        console.log(idBuscado)
        if(!isNaN(idBuscado))
            resp.send(TypePoint[idBuscado])
        else
            resp.status(400).send(errors[2])
    })
app.route('/api/type')
    .get(function(req,resp){
        resp.send(TypePoint)
    })
app.route('/api/point/:id')
    .get(function(req,resp){//DONE
        var idBuscado = parseInt(req.params.id)
        if(!isNaN(idBuscado)){
            var objeto = lista.get(idBuscado)
            if(objeto)
                resp.status(200).send(objeto)
            else
                resp.status(404).send({code:2,message:"El item no existe"})
        }else
            resp.status(400).send({code:2,message:"El id debería ser numérico"})        
    })
    .put(function(req,resp){//DONE
        var idBuscado = parseInt(req.params.id)
        var objeto = lista.get(idBuscado)
        if(objeto){ 
            if(req.body.nombre && req.body.coordX && req.body.coordY){

            }
            var nuevo = Object.create(Point)
            nuevo.name = req.body.nombre;
            nuevo.coordX = req.body.coordX;
            nuevo.coordY = req.body.coordY;
            lista.set(idBuscado,nuevo);
            resp.status(200).send(nuevo);
        }else
            resp.status(404).send({code:2,message:"El item no existe"})
        
    })
    .delete(function(req,resp){//DONE
        var idBuscado = parseInt(req.params.id)
        var objeto = lista.get(idBuscado)
        if(objeto){
            lista.delete(idBuscado);
            resp.status(200).send();
        }else
            resp.status(404).send({code:2,message:"El item no existe"})
    })
app.route('/api/point')
    .get(function(req,resp){//DONE
        var datos = Array.from(lista.values());
        resp.status(200).send(datos);
    })
    .post(function(req,resp){   //DONE
        var nuevo= req.body

        if(nuevo.nombre){
            var nuevoObjeto = {id:idActual,nombre:nuevo.nombre}
            lista.set(nuevoObjeto.id,nuevoObjeto)
            resp.status(201).header('Location', 'http://localhost:3000/api/point/'+idActual).send(nuevoObjeto)
            idActual++
        }else
            resp.status(400).send({code:3,message:'Falta el campo nombre'})

    })


//Este método delega en el server.listen "nativo" de Node
app.listen(3000, function () {
    lista = new Map()
    var i = 0;
    for(i;i<5;i++){
        var nuevo = Object.create(Point)
        nuevo.name = "Punto "+idActual;
        nuevo.coordX = 0;
        nuevo.coordY = 0;
        nuevo.coordZ = 0;
        nuevo.TypePoint = TypePoint[1];
        lista.set(idActual,nuevo);
        idActual++;
    }
   console.log("El servidor express está en el puerto 3000");
});

