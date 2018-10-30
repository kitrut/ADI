
//Cargamos el módulo express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./BBDD.db');
//lista de puntos
var lista;
var idActual = 1;
var errors =[{code:1,message:"Error desconocido"},{code:2,message:"El item no existe"},{code:3,message:"El id debería ser numerico"}]
var TypePoint=["Semáforo acústico","Rampa discapacitados","Servicio adaptado"];
var Point = require('./modelo/point');
var puntos=[];

lista = new Map()
var i = 0;
for(i;i<5;i++){
        var nuevo = Object.create(Point)
        nuevo.name = "Punto "+idActual;
        nuevo.coordX = 0;
        nuevo.coordY = 0;
        nuevo.coordZ = 0;
        lista.set(idActual,nuevo);
        puntos[i]=nuevo;
        //BD.insertPoint(nuevo);
        idActual++;
}




db.serialize(function() {

  db.run('DROP TABLE IF EXISTS point');
  db.run('CREATE TABLE point (id TEXT,name TEXT,coordX TEXT,coordY TEXT,coordZ TEXT)');
  var stmt = db.prepare('INSERT INTO point VALUES (?,?,?,?,?)');

  for (var i = 0; i < 11; i++) {
    stmt.run(i,"Punto "+i,0,0,0);
  }

  stmt.finalize();

  db.each('SELECT * FROM point', function(err, row) {
    console.log(row.id + ': ' + row.name+': '+row.coordX);
  });
});





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
        db.get("Select * from point where id="+req.params.id,(err,row)=>{                    
            if(row && err === null)
                resp.send({"id":""+row.id,"name":""+row.name,"coordX":""+row.coordX,"coordY":""+row.coordY,"coordZ":""+row.coordZ})
            else
                resp.status(404).send(errors[1]);
        });   
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
        db.all("Select * from point",(err,row)=>{                    
            if(row && err === null){
                var aux =[];
                var i=0;
                row.forEach(function (row) {
                    aux[i]={"id":""+row.id,"name":""+row.name,"coordX":""+row.coordX,"coordY":""+row.coordY,"coordZ":""+row.coordZ};
                    i++;
                })
                resp.send(aux)
            }
            else
                resp.status(404).send(errors[1]);
        });   
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
var server = app.listen(3000, function () {
   console.log("El servidor express está en el puerto 3000");
});

process.on('SIGINT', () => {
    db.close();
    server.close();
});