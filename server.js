
// node packages that are needed for making server connections
var express = require ('express');
var path = require('path');
var bodyParser = require('body-parser');
var apiRoutes = require('./app/routing/apiRouting');
var htmlRoutes = require('./app/routing/htmlRoutes');


// Tells node that we are creating an "express" server
var app = express();
// Sets an initial port.
var PORT = process.env.PORT || 3000;

// BodyParser makes it easy for our server to interpret data sent to it.
// The code below is pretty standard.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


apiRoutes(app);

htmlRoutes(app);

app.listen(PORT, function(req, res) {
	console.log('listening');
});
