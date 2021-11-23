
const express = require('express');
const lTekshir = express();
const bodyParse = require("body-parser");
const hbs = require("hbs");
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
lTekshir.set("view engine", "hbs");
const natija = bodyParse.urlencoded({extended: false});

lTekshir.post('/lTekshir', natija, (req, res) => {
     let userLogin = req.body;
     mongo.connect(url, (err, db) => {
          if (err) throw err;
          var dbo = db.db("Supperquiz");
          dbo.collection("login").find({}).toArray((err, result) => {
               if (err) throw err;
               if(userLogin.login == result[0].login && userLogin.password == result[0].password) {
                    let fanIsm = require('./fanIsm');
                    res.render("fanRuyhat.hbs", {fanIsm});
               }
               else {
                    let smslar = [{
                         h4: "Xatolik",
                         p: "Login yoki parol hato",
                         hrefcha: "Login.hbs"
                    }]
                    res.render("yordamchi.hbs", {smslar});
               }
               db.close();
          });
     });
})

module.exports = lTekshir;