var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/BBDD.db');
var DAOpoint = require('./data_models/DAOpoint');
var DAOtype = require('./data_models/DAOtype');
var DAOuser = require('./data_models/DAOuser');

router.get('/',function(req,resp){resp.send('Hola soy Express');})

router.post('/login',function(req,resp){DAOuser.login(req,resp,db)})
router.post('/registro',function(req,resp){DAOuser.registro(req,resp,db)});
router.post('/logout',function(req,resp){DAOuser.logout(req,resp)});

router.get('/api/types/:id',function(req,res){DAOtype.find(req,res,db)});
router.get('/api/types',function(req,resp){DAOtype.all(req,resp,db)});
router.get('/api/types/:id/points',function(req,resp){DAOtype.findWithPoint(req,resp,db)});

router.get('/api/points/:id',function(req,resp){ DAOpoint.find(req,resp,db)})
router.put('/api/points/:id',function(req,resp){DAOpoint.put(req,resp,db)})
router.delete('/api/points/:id',function(req,resp){DAOpoint.delete(req,resp,db)})
router.get('/api/points',function(req,resp){DAOpoint.all(req,resp,db)})
router.post('/api/points',function(req,resp){DAOpoint.post(req,resp,db)})

module.exports = router;