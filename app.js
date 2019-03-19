var express = require('express')
var app = express()
var expressWs = require('express-ws')(app);

app.ws('/update', function(ws, req){
    ws.on('message', function(msg){
        console.log(msg)

    })
})

app.get('/', function(req, res){
    res.send('Here will be the static page')
})

app.post('/vehicle/:vehicleID/long/:longVal/lat/:latVal', function(req,res){
    console.log(req.params);
    res.json('200 OK');
})


app.listen(3000);
https://www.vegvesen.no/vegkart/vegkart/#kartlag:geodata/vegreferanse:270896.3668887719:7040192.320446634/hva:(~(farge:'0_0,id:95))/@270874,7040224,18/vegobjekt:536626829:40a744:95


