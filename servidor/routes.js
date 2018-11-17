var express = require('express');
var router = express.Router();
let request = require('request');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/BBDD.db');
var DAOpoint = require('./data_models/DAOpoint');
var DAOtype = require('./data_models/DAOtype');
var DAOuser = require('./data_models/DAOuser');

function checkAuth(req,resp,next){
    if(req.body.token){
        db.get('SELECT * FROM usuario WHERE token="'+req.body.token+'"',function(err,row){
            if(err) resp.status(500).send({"error":"Error en BBDD"});
            else if(row){
                if(row.token===req.body.token){
                    console.log("El usuario "+row.name+" ha solicitado el recurso: "+req.path);
                    next();               
                }else{
                    resp.status(401).send({"error":"No estas autorizado, debes registrarte"});
                }
            }
            else resp.status(401).send({"error":"No estas autorizado, debes registrarte"});              
        })
    }else resp.status(401).send({"error":"No estas autorizado, debes registrarte"}); 
}


router.get('/',function(req,resp){resp.send('Hola soy Express');})
router.get('/time',function(req,resp){
    let apiKey = '811a871418511ca0234f9e42ab4382f4';
    let city = 'Alicante';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if(err) resp.status(500).send(err);
        else resp.send(body);
    });
})


router.post('/login',function(req,resp){DAOuser.login(req,resp,db)})
router.post('/registro',function(req,resp){DAOuser.registro(req,resp,db)});
router.post('/logout',function(req,resp){DAOuser.logout(req,resp)});

// PARTE PÚBLICA 
router.get('/api/types/:id/points',function(req,resp){DAOtype.findWithPoint(req,resp,db)});
router.get('/api/types/:id',function(req,res){DAOtype.find(req,res,db)});
router.get('/api/types',function(req,resp){DAOtype.all(req,resp,db)});



router.get('/api/points/:id',function(req,resp){ DAOpoint.find(req,resp,db)})
router.put('/api/points/:id',checkAuth,function(req,resp){DAOpoint.put(req,resp,db)})
router.delete('/api/points/:id',checkAuth,function(req,resp){DAOpoint.delete(req,resp,db)})
router.get('/api/points',function(req,resp){DAOpoint.all(req,resp,db)})
router.post('/api/points',checkAuth,function(req,resp){DAOpoint.post(req,resp,db)})



module.exports = router;