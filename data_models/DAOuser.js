var jwt = require('jwt-simple');
var secret = '123';

var userIDCount = 1;
DAOuser ={
    registro:function(req,resp,db){
        var stmt = db.prepare('INSERT INTO usuario VALUES (?,?,?)');
        stmt.run(userIDCount,req.body.usuario,jwt.encode(req.body.password,secret));
        stmt.finalize();
        userIDCount++;
        db.each("Select * from usuario",function(err,row){
            console.log(row);
        })
      resp.send("OK")
    },
    login:function(req,resp,db){
        resp.send(jwt.encode("Intento de conexion",secret))
    },
    logout:function(req,resp){
        console.log("Intento de desconectar");
        resp.send("OK")
    }
}
module.exports = DAOuser;