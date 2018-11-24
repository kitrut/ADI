DAOtype={
    find:function(req,resp,db){
        db.get("Select * from type where id="+req.params.id,(err,row)=>{                    
            if(err) resp.status(400).send({"error":0,"message":"Error en la sentencia SQL"});
            else if(row) resp.send(row);
            else resp.status(404).send({"error":1,"message":"El recurso no existe"});
        });
    },
    all:function(req,resp,db){
        var sql = "SELECT * FROM type";
        var limit = 4;
        var offset = limit;
        if(req.query.limit) limit = req.query.limit;    
        if(req.query.offset) offset = req.query.offset * limit;
        if(req.query.limit && req.query.offset) sql += (" Limit "+limit+" OFFSET "+offset);
        db.all(sql,(err,row)=>{                    
            if(row && err === null) resp.send(row);
            else resp.status(404).send(errors[1]);
        });
    },
    findWithPoint:function(req,resp,db){
        db.get("Select * from type where id="+req.params.id,(err,row)=>{                    
            if(err) resp.status(400).send({"error":0,"message":"Error en la sentencia SQL"});
            else if(row){ 
                db.all("Select * from point where type="+req.params.id,(err2,row2)=>{
                    if(err2) resp.status(400).send({"error":0,"message":"Error en la sentencia SQL"});
                    if(row2) row.points = row2;
                    else row.points = {};
                    resp.send(row);
                })                
            }
            else resp.status(404).send({"error":1,"message":"El recurso no existe"});
        });
    }
}

module.exports = DAOtype;