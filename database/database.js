var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./BBDD.db');

database = {
    createModel:function(){
        db.serialize(function() {
            var TypePoint=["Semáforo acústico","Rampa discapacitados","Servicio adaptado"];
            console.log("Borrando base de datos...")
            db.run('DROP TABLE IF EXISTS point');
            db.run('DROP TABLE IF EXISTS type');
            console.log("Se han eliminado todas las tablas de la base de datos")

            console.log("Creando base de datos y ejecutando seeders...");
            db.run('CREATE TABLE type (id INTEGER,name TEXT)');
            stmt = db.prepare('INSERT INTO type VALUES (?,?)');
            for(var i = 0;i<TypePoint.length;i++){
                stmt.run(i,TypePoint[i]);
            }
            stmt.finalize();          
            
            db.run('CREATE TABLE point (id INTEGER,name TEXT,coordX TEXT,coordY TEXT,coordZ TEXT,type INTEGER, FOREIGN KEY(type) REFERENCES type(id))');
            var stmt = db.prepare('INSERT INTO point VALUES (?,?,?,?,?,?)');
            
            for (var i = 0; i < 10; i++) {
              stmt.run(i,"Punto "+i,0,0,0,0);
              console.log(i)
            }
            
            stmt.finalize();
          });
    },
    close:function(){
        db.close();
    }
}
module.exports = database;