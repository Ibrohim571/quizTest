
const express = require('express');
const deleteQuiz = express();
const bodyParse = require("body-parser");
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const natija = bodyParse.urlencoded({extended: false});

deleteQuiz.post(`/quizDelete/:${this.savol}`, natija, (req, res) => {
     let dbIsm = req.body.dbIsm;
     mongo.connect(url, (err, db) => {
          if (err) throw err;
          let dbo = db.db("Supperquiz");
          let myquery = { savol: req.params.undefined };
          dbo.collection(`${dbIsm}`).deleteOne(myquery, (err, obj) => {
            if (err) throw err;
            db.close();
          });
     });
     let fanIsm = req.body.dbIsm;
     mongo.connect(url, (err, db) => {
          if (err) throw err;
          var dbo = db.db("Supperquiz");
          dbo.collection(`${fanIsm}`).find({}).toArray((err, result) => {
               if (err) throw err;
               for(let i = 0; result.length > i; i ++) {
                    result[i].fanIsm = fanIsm;
               }
               res.render('quizTable.hbs', {result, fanIsm});
               
            db.close();
          });
     });
})

module.exports = deleteQuiz;