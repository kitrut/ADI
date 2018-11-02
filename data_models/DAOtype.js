DAOtype={
    find:function(req,resp,db){
        db.get("Select * from type where id="+req.params.id,(err,row)=>{                    
            if(err) resp.status(400).send({"error":0,"message":"Error en la sentencia SQL"});
            else if(row) resp.send(row);
            else resp.status(404).send({"error":1,"message":"El recurso no existe"});
        });
    },
    all:function(req,resp,db){
        db.all("Select * from type",(err,row)=>{                    
            if(row && err === null) resp.send(row);
            else resp.status(404).send(errors[1]);
        });
    }
}

module.exports = DAOtype;