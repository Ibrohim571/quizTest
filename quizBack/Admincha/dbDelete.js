
const express = require('express');
const dbDelete = express();
const bodyParse = require("body-parser");
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
dbDelete.set("view engine", "hbs");

const natija = bodyParse.urlencoded({extended: false});

dbDelete.get(`/dbDelete/:${this.fanIsm}`, (req, res) => {
     let dbIsm = req.params.undefined;
     let ismdel = {ism: dbIsm};

     mongo.connect(url, (err, db) => {
          if (err) throw err;
          let dbo = db.db("Supperquiz");
          dbo.collection(`${dbIsm}`).drop((err, delOK) => {
               if (err) throw err;

               dbo.collection("fanIsm").deleteOne(ismdel, (err, obj) => {
                    if (err) throw err;
               });
               db.close();
          })
     })

     mongo.connect(url, (err, db) => {
          if (err) throw err;
          let dbo = db.db("Supperquiz");
          dbo.collection("fanIsm").find({}).toArray((err, result) => {
               if (err) throw err;
               let fanIsm = result;
               let indexcha;
               for(let i = 0; fanIsm.length > i; i++) {
                    if(fanIsm[i].ism == dbIsm) {
                         indexcha = i;
                    }
               }
               fanIsm.splice(indexcha, 1);

               res.render("fanRuyhat.hbs", {fanIsm});
               db.close();
          });
     })
})

module.exports = dbDelete;