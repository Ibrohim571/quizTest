 
const express = require('express');
const getQuizism = express();
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

mongo.connect(url, (err, db) => {
     if (err) throw err;
     let dbo = db.db("Supperquiz");
     dbo.collection("fanIsm").find({}).toArray((err, result) => {
          if (err) throw err;

          let fanArray = [];
          for(let i = 0; result.length > i; i ++) {
               fanArray[i] = result[i].ism;
          }
          for(let i = 0; fanArray.length > i; i ++) {
               let qismArray = fanArray[i];
               getQuizism.get(`/yangisi/${qismArray}`, (req, res) => {
                    dbo.collection(`${qismArray}`).find({}).toArray((errr, resultcha) => {
                         if (errr) throw errr;
     
                         let massiv = [], index1, index2;
                         for(let i = 0; 10 > i; i ++) {
                              index1 = Math.floor(Math.random() * 10);
                              index2 = Math.floor(Math.random() * 10);
                    
                              let key = resultcha[index1];
                              resultcha[index1] = resultcha[index2];
                              resultcha[index2] = key;
                         }
                         for(let i = 0; 10 > i; i ++) {
                              massiv[i] = resultcha[i];
                         }

                         res.send(massiv);
          
                    })
               })
          }
     })
})

module.exports = getQuizism;