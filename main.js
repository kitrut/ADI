
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


var idPointBBDD = 0;

db.serialize(function() {

  db.run('DROP TABLE IF EXISTS point');
  db.run('DROP TABLE IF EXISTS type');
  db.run('CREATE TABLE type (id INTEGER,name TEXT)');
  stmt = db.prepare('INSERT INTO type VALUES (?,?)');
  for(var i = 0;i<TypePoint.length;i++){
      stmt.run(i,TypePoint[i]);
  }
  stmt.finalize();

  
  db.run('CREATE TABLE point (id INTEGER,name TEXT,coordX TEXT,coordY TEXT,coordZ TEXT,type INTEGER, FOREIGN KEY(type) REFERENCES type(id))');
  var stmt = db.prepare('INSERT INTO point VALUES (?,?,?,?,?,?)');
  
  for (var i = 0; i < 11; i++) {
    stmt.run(idPointBBDD,"Punto "+i,0,0,0,0);
    idPointBBDD++;
  }
  
  stmt.finalize();

  db.each('SELECT * FROM point', function(err, row) {
    console.log(row.id + ': ' + row.name+': '+row.coordX + ' es del type: '+row.type);
  });
  db.each('Select * from type',function(err,row){
      console.log(row.id + ': '+row.name);
  })
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

app.route('/api/types/:id')
    .get(function(req,resp){
        db.get("Select * from type where id="+req.params.id,(err,row)=>{                    
            if(row && err === null) resp.send(row);
            else resp.status(404).send(errors[1]);
        });
    })
app.route('/api/types')
    .get(function(req,resp){
        db.all("Select * from type",(err,row)=>{                    
            if(row && err === null) resp.send(row);
            else resp.status(404).send(errors[1]);
        });
    })
app.route('/api/points/:id')
    .get(function(req,resp){
        console.log("Dame el punto numero: "+req.params.id);
        db.get("Select * from point where id="+req.params.id,(err,row)=>{                    
            if(row && err === null)  resp.send(row)
            else resp.status(404).send(errors[1]);
        });   
    })
    .put(function(req,resp){
        var sql = 'UPDATE point SET '+
            'name="'+req.body.name +
            '",coordX="' + req.body.coordX +
            '",coordY="' + req.body.coordY +
            '",coordZ="' + req.body.coordZ +
            '",type ="' + req.body.type +
            '" where id='+req.params.id;
        db.run(sql,function(err){
            if(err) resp.status(404).send(err);
            else    resp.status(200).send();
            
        })        
    })
    .delete(function(req,resp){
        var idBuscado = parseInt(req.params.id)
        var objeto = lista.get(idBuscado)
        if(objeto){
            lista.delete(idBuscado);
            resp.status(200).send();
        }else resp.status(404).send({code:2,message:"El item no existe"})
    })
app.route('/api/points')
    .get(function(req,resp){//DONE
        db.all("Select * from point",(err,row)=>{                    
            if(row && err === null) resp.send(row)
            else resp.status(404).send(errors[1]);
        });   
    })
    .post(function(req,resp){
        var body= req.body
        var stmt = db.prepare('INSERT INTO point VALUES (?,?,?,?,?,?)');
        stmt.run(idPointBBDD,body.name,body.coordX,body.coordY,body.coordZ,body.type,function(err){
            if(err) resp.status(400).send("Error");
            else{
                resp.status(201).header('Location', 'http://localhost:3000/api/point/'+idPointBBDD).send();
                idPointBBDD++;
            }
        });
        stmt.finalize();
    })


//Este método delega en el server.listen "nativo" de Node
var server = app.listen(3000, function () {
   console.log("El servidor express está en el puerto 3000");
});

process.on('SIGINT', () => {
    db.close();
    server.close();
});