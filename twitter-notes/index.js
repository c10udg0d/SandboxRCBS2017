console.log ("Hello World!!");
var express = require('express');
var app = express();

app.get("/",function(req,res){
    res.send("Apanhei o pedido. Aqui vai a resposta");
});

app.listen(8080, function() {
    console.log("Express Server a correr no porto 8080");
});