
const express = require('express');
const fanIsmget = express();
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

fanIsmget.get('/fanIsmget/ismlar', (req, res) => {
     mongo.connect(url, (err, db) => {
          if (err) throw err;
          let dbo = db.db("Supperquiz");
          dbo.collection("fanIsm").find({}).toArray((err, result) => {
               if (err) throw err;
               res.send(result);
          })
     })
})

module.exports = fanIsmget;