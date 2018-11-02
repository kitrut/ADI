DAOpoint ={
    find:function(req,resp,db){
        console.log("Dame el punto numero: "+req.params.id)
        var stmt = db.prepare("Select * from point where id = ?");
        stmt.bind(req.params.id);
        stmt.get(function(err,row){
            if(err) resp.status(400).send({"error":0,"message":"Error en la sentencia SQL"});
            else if(row) resp.send(row);
            else resp.status(404).send({"error":1,"message":"El recurso no existe"});
        })
    },
    put:function(req,resp,db){
        var sql = 'UPDATE point SET '+
            'name="'+req.body.name +
            '",coordX="' + req.body.coordX +
            '",coordY="' + req.body.coordY +
            '",coordZ="' + req.body.coordZ +
            '",type ="' + req.body.type +
            '" where id='+req.params.id;
        db.run(sql,function(err){
            if(err) resp.status(404).send(err);
            else    resp.status(204).send();
            
        })   
    },
    delete:function(req,resp,db){
        db.run("DELETE FROM point where id="+req.params.id,function(err){
            if(err) resp.status(400).send(err);
            else resp.status(202).send();
        })
    },
    all:function(req,resp,db){
        db.all("Select * from point",(err,row)=>{                    
            if(row && err === null) resp.send(row)
            else resp.status(404).send(errors[1]);
        });  
    },
    post:function(req,resp,db){
        var body= req.body
        var stmt = db.prepare('INSERT INTO point VALUES (?,?,?,?,?,?)');
        stmt.run(null,body.name,body.coordX,body.coordY,body.coordZ,body.type,function(err,row){
            if(err) resp.status(400).send("Error");
            else{
                resp.status(201).header('Location', 'http://localhost:3000/api/point/'+stmt.lastID).send();
            }
        });
        stmt.finalize();
    }
}

module.exports = DAOpoint;