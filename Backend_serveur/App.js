const express = require ('express');
const mongo = require('mongodb');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const body_parser = require('body-parser');
const router = require('./router/rouetr');
const routerajout = require('./router/ajouter');
const path = require('path');



 mongoose.connect('mongodb+srv://badama:hassane1998COM@expressapi.lzw8bql.mongodb.net/deuxieme_teste?retryWrites=true&w=majority&appName=ExpressApi',
// {userNewUrlParser:true,useUnifiedTopology:true

// }
).then(()=>console.log("connexion en mongodb recu"))
 .catch(()=>{
    console.log("connexion n'est pas vraiment  reçu");
 });
//  app.get('/',(req, res)=>{
//     res.send("bonjoure bbbb")
//  });

app.use((req,res, next)=>{
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION');
   next();
});
app.use(express.json());
app.use(body_parser.json());
app.use('/api/auth',router);
app.use('/api/sauces',routerajout);
//chemin en local
app.use('/images', express.static(path.join(__dirname,'images')));
module.exports = app;
