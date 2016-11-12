var express = require('express');
var app = express();
var https = require('https');
var http = require('http');
var fs = require('fs');

var port = 5000; // 5000 is proxy for browersync purposes; use localhost:3000 to load site

require('./config/middleware.js')(app, express); // Middleware

app.listen(port, () => {
  console.log('Listening on Port: ' + port);
});

module.exports = app;