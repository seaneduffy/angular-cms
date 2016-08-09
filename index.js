'use strict';

let express = require('express'),
	http = require('http'),
	app = express();

app.set('views', __dirname);
app.set('view engine', 'ejs');
app.use(express.static('./bower_components'));	
app.use(express.static('./public'));
	
app.get('/', function(req, res) {
	res.render('index', {});
});

http.Server(app).listen(3000, function(){
	console.log("server started at port 3000");
});