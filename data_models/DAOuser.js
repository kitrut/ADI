var jwt = require('jwt-simple');
var secret = '123';

DAOuser ={
    registro:function(req,resp,db){
        var stmt = db.prepare('INSERT INTO usuario VALUES (?,?)');
        var token = jwt.encode(req.body.password,secret);
        stmt.run(req.body.usuario,token);
        stmt.finalize();
      resp.send({"token":token})
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