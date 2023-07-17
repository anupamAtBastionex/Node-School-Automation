const express   = require('express');
var bodyParser  = require('body-parser');

const route     = require('./routes/route.js');
const app       = express();

app.use(bodyParser.json());// basically tells the system that we  want json to be used  
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose  = require('mongoose')
let str         = "mongodb://127.0.0.1:27017/school";
// 
// let str="mongodb://127:0.0.1:27017/abcvccv"
mongoose.connect(str,
    { useNewUrlParser: true })
    .then(() => { console.log('mongodb running and connected') })
    .catch(err => console.log(err,"wwwww"))

app.use('/', route);

app.listen(process.env.PORT || 7000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 7000))
});



