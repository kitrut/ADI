var jwt = require('jwt-simple');
var secret = '123';

DAOuser ={
    comprobarToken:function(token,db){
        db.get('SELECT * FROM usuario WHERE token="'+token+'"',function(err,row){
            console.log("REspuesta en bbdd: "+row.token)
            if(err) return false;
            else if(row){
                return true;                
            }
            else return false;               
        })
    },
    registro:function(req,resp,db){
        var stmt = db.prepare('INSERT INTO usuario VALUES (?,?)');
        var token = jwt.encode(req.body.usuario+req.body.password,secret);
        stmt.run(req.body.usuario,token,function(err){
            if(err){
                resp.status(400).send({"error":"nombre de usuario no disponible"});
            }else{
                resp.status(201).send({"token":token});
            }
        });
        stmt.finalize();
    },
    login:function(req,resp,db){
        db.get('SELECT * FROM usuario WHERE name="'+req.body.usuario+'"',function(err,row){
            if(err)resp.status(500).send(err);
            else if(row){
                var token = jwt.encode(req.body.usuario+req.body.password,secret);
                if(row.token==token) resp.send({"code":token});
                else resp.status(401).send({"error":"Usuario no autorizado"});                
            }
            else resp.status(404).send({"error":"usuario invalido"});                
        })
    }
}
module.exports = DAOuser;