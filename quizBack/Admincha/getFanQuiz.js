
const express = require('express');
const getFanQuiz = express();
const bodyParse = require("body-parser");
const hbs = require("hbs");
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
getFanQuiz.set("view engine", "hbs");

const natija = bodyParse.urlencoded({extended: false});

getFanQuiz.post(`/:${this.ism}`, natija, (req, res) => {
     let fanIsm = req.body.inputIsm;
     mongo.connect(url, (err, db) => {
          if (err) throw err;
          let dbo = db.db("Supperquiz");
          dbo.collection(`${fanIsm}`).find({}).toArray((err, result) => {
               for(let i = 0; result.length > i; i ++) {
                    result[i].fanIsm = fanIsm;
               }
               res.render("quizTable.hbs", {result, fanIsm});
          })
     })
})

module.exports = getFanQuiz;