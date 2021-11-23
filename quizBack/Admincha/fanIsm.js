
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

mongo.connect(url, (err, db) => {
     if (err) throw err;
     var dbo = db.db("Supperquiz");
     dbo.collection("fanIsm").find({}).toArray((err, result) => {
          module.exports = result;
     })
})
