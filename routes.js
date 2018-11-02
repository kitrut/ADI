var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/BBDD.db');
var DAOpoint = require('./data_models/DAOpoint')
var DAOtype = require('./data_models/DAOtype')

router.get('/',function(req,resp){resp.send('Hola soy Express');})

router.get('/api/types/:id',function(req,res){DAOtype.find(req,res,db)})
router.get('/api/types',function(req,resp){DAOtype.all(req,resp,db)})

router.get('/api/points/:id',function(req,resp){ DAOpoint.find(req,resp,db)})
router.put('/api/points/:id',function(req,resp){DAOpoint.put(req,resp,db)})
router.delete('/api/points/:id',function(req,resp){DAOpoint.delete(req,resp,db)})
router.get('/api/points',function(req,resp){DAOpoint.all(req,resp,db)})
router.post('/api/points',function(req,resp){DAOpoint.post(req,resp,db)})

module.exports = router;