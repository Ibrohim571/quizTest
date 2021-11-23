
const express = require('express');
const app = express();
const hbs = require('hbs');
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const port = 5000;

app.set("view engine", "hbs");

app.use(function (req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
})

app.get('/fanIsmget/ismlar', require('./fanIsmget'));
app.get('/Login', (req, res) => {res.render('Login.hbs')});
app.post('/lTekshir', require('./Admincha/Login'));
app.post("/addFan", require("./Admincha/addFan"));
app.post(`/:${this.ism}`, require("./Admincha/getFanQuiz"));
app.post(`/quizDelete/:${this.savol}`, require("./Admincha/deleteQuiz"));
app.post(`/add/newQuiz`, require('./Admincha/addNewQuiz'));
app.get(`/yordamchi/:${this.hrefcha}`, (req, res) => {res.render(req.params.undefined)});
app.get(`/dbDelete/:${this.fanIsm}`, require('./Admincha/dbDelete'));

// savolllarni chiqarish
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
               app.get(`/yangisi/${qismArray}`, require('./getQuizism'));
          }
     })
})


app.listen(port, () => {
     console.log(`${port} quiz tayyor`);
})