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

/* Entrypoint for vehicle posting location
 * Updates all sockets to vehicles current state, returns status code to vehicle
 * Input: HTML request, and resources, with a resourceful url
 * Output: None
*/
app.post('/vehicle/:vehicleID/long/:longVal/lat/:latVal', function(req,res){
    console.log(req.params);
    res.json('200 OK');
    io.emit('car position update', req.params);
})

http.listen(3000);
// https://www.vegvesen.no/vegkart/vegkart/#kartlag:geodata/vegreferanse:270896.3668887719:7040192.320446634/hva:(~(farge:'0_0,id:95))/@270874,7040224,18/vegobjekt:536626829:40a744:95
