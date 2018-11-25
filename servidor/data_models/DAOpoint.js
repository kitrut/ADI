let page_size_default=4;
let page_numer_default = 1;


DAOpoint ={
    find:function(req,resp,db){
        console.log("Dame el punto numero: "+req.params.id)
        db.get("Select p.*,t.type_name from point p,type t where p.id ="+req.params.id+" and p.type=t.id",function(err,row){
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
        var sql = "SELECT * FROM point";
        var limit = page_size_default;
        var offset = limit * page_numer_default;
        if(req.query.limit) limit = req.query.limit;    
        if(req.query.offset) offset = req.query.offset * limit;
        if(req.query.limit && req.query.offset) sql += (" Limit "+limit+" OFFSET "+offset);
        db.all(sql,(err,row)=>{                    
            if(err) resp.status(500).send(err);
            if(row) resp.send(row);
            else resp.status(404).send({"error":""});
        });  
    },
    post:function(req,resp,db){
        var body= req.body
        var stmt = db.prepare('INSERT INTO point VALUES (?,?,?,?,?,?,?)');
        stmt.run(null,body.name,body.coordX,body.coordY,body.coordZ,body.type,"",function(err,row){
            if(err) resp.status(400).send("Error");
            else{
                resp.status(201).header('Location', 'http://localhost:3000/api/point/'+stmt.lastID).send();
            }
        });
        stmt.finalize();
    }
}

module.exports = DAOpoint;