/*console.log ("Hello World!!");
var express = require('express');
var app = express();

app.get("/",function(req,res){
    res.send("Apanhei o pedido. Aqui vai a resposta");
});

app.listen(8080, function() {
    console.log("Express Server a correr no porto 8080");
});*/

var url = require('url');
var express = require('express');
var authenticator = require('./authenticator');
var config = require('./config');
var app = express();

// Add cookie parsing functionality to our Express app
app.use(require('cookie-parser')());

// Take user to Twitter's login page
app.get('/auth/twitter', authenticator.redirectToTwitterLoginPage);

// This is the callback url that the user is redirected to after signing in
app.get(url.parse(config.oauth_callback).path, function(req, res) {
	authenticator.authenticate(req, res, function(err) {
		if (err) {
			console.log(err);
            res.send("You Failed");
			res.sendStatus(401);
		} else {
			res.send("Authentication Successful");
		}
	});
});

// Start listening for requests
app.listen(config.port, function() {
	console.log("Listening on port " + config.port);
});