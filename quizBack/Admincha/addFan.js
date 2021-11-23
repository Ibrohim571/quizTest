
const express = require('express');
const addFan = express();
const bodyParse = require("body-parser");
const hbs = require("hbs");
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
addFan.set("view engine", "hbs");
const natija = bodyParse.urlencoded({extended: false});

addFan.post("/addFan", natija, (req, res) => {
     let newFan = req.body;
     mongo.connect(url, (err, db) => {
          if (err) throw err;
          let dbo = db.db("Supperquiz");
          dbo.collection("fanIsm").find({}).toArray((err, result) => { 

              let smslar = [{
                h4: "Error",
                p: "Fan ismini kiiritishda hatolik",
                hrefcha: "fanRuyhat.hbs"
              }]
               result.forEach(element => {
                  if(element.ism == newFan.ism) {
                    newFan.ism = "";
                    res.render("yordamchi.hbs", {smslar});
                  }
               });

               let id = +result.length + 1;
               newFan.id = id;

               if(newFan.ism != "") {
                 dbo.collection("fanIsm").insertOne(newFan, (err, resi) => {
                   if (err) throw err;
                 });
                 
                 dbo.createCollection(`${newFan.ism}`, (err, resa) => {
                    if (err) throw err;
                  });
               }
               else {
                 res.render("yordamchi.hbs", {smslar});
               }
               
               let fanIsm = result;
               fanIsm.push(newFan);
               res.render("fanRuyhat.hbs", {fanIsm});
               db.close();
          })
        });
})

module.exports = addFan;