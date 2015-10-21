var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

//set the port :)
var port = process.env.PORT || 80;

//serve the client out of /client
app.use(express.static(__dirname + '/client'));

// Start the SERVER of AWESEOME!
app.listen(port);
console.log('Magic happens on port ' + port);
