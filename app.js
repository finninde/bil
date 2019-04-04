var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

/* Callback for basepage
 * Sends index.html
 * Input: HTML request, and resources
 * Output: None
*/
app.get('/', function(req, res){
    res.sendFile(__dirname + '/static/index.html');
});

/* Callback for vegobjekter
 * Sends vegobjekter.json
 * Input: HTML request, and resources
 * Output: None 
*/
app.get('/static/vegobjekter.json', function(req, res){
    res.sendFile(__dirname + '/static/vegobjekter.json');
});


/* Entrypoint for vehicle posting location
 * Updates all sockets to vehicles current state, returns status code to vehicle
 * Input: HTML request, and resources, with a resourceful url
 * Output: None
*/
app.post('/vehicle/:vehicleID/long/:longVal/lat/:latVal', function(req,res){
    console.log(req.params);
    res.json('200 OK');
    io.emit('car position update', req.params);
});

http.listen(3000);
