// ====--====  yangi savol va variantlar qushadi ===---====

const express = require('express');
const addNewQuiz = express();
const bodyParse = require("body-parser");
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
addNewQuiz.set("view engine", "hbs");

const natija = bodyParse.urlencoded({extended: false});

addNewQuiz.post('/add/newQuiz', natija, (req, res) => {
          let fanIsm = req.body.dataName;

          mongo.connect(url, (err, db) => {
               if (err) throw err;
               let dbo = db.db("Supperquiz");
               dbo.collection(`${fanIsm}`).find({}).toArray((err, result) => {
                    if (err) throw err;
                    let arraySavol = [];
                    for(let i = 0; result.length > i; i ++) {
                         arraySavol[i] = result[i].savol;
                    }
                    if (arraySavol.includes(req.body.savol)) {
                         res.send("bor");
                    } else {
                         let myquiz = req.body;
                         delete myquiz.dataName;
                         dbo.collection(`${fanIsm}`).insertOne(myquiz, (err, res) => {
                              if (err) throw err;
                         });
                    }
                    db.close();
               });
          });
          
          mongo.connect(url, (err, db) => {
               if (err) throw err;
               var dbo = db.db("Supperquiz");
               dbo.collection(`${fanIsm}`).find({}).toArray((err, result) => {
                    if (err) throw err;
                    result.push(req.body);
                    for(let i = 0; result.length > i; i ++) {
                         result[i].fanIsm = fanIsm;
                    }
                    res.render('quizTable.hbs', {result, fanIsm});
                    
                 db.close();
               });
          });
})

module.exports = addNewQuiz;