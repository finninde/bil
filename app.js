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
// https://www.vegvesen.no/vegkart/vegkart/#kartlag:geodata/vegreferanse:270896.3668887719:7040192.320446634/hva:(~(farge:'0_0,id:95))/@270874,7040224,18/vegobjekt:536626829:40a744:95
// GET https://www.vegvesen.no/nvdb/api/v2/omrader/fylker?inkluder=kartutsnitt,vegobjekt
// Kartutsntitt : ?kartutsnitt={longitudeMin, latitudeMin, longitudeMax, latitudeMax}&srid=4326
// ?kartutsnitt={10.400838, 63.413473,10.409319, 63.420446}&srid=4326
// ?kartutsnitt=10.400838,63.413473,10.409319,63.420446&srid=4326
// latlon min
// 63.413473,10.400838
// latlon max
// 63.420446,10.409319
// ?kommune=5001
// <kommune>
// <navn>Trondheim</navn>
// <nummer>5001</nummer>
// <region>4</region>
// <fylke>50</fylke>
// <vegavdeling>50</vegavdeling>
// </kommune>
// https://www.utv.vegvesen.no/nvdb/api/v2/vegobjekter?inkluder=?kartutsnitt=10.400838,63.413473,10.409319,63.420446&srid=4326
// https://www.vegvesen.no/nvdb/api/v2/vegobjekter/24?kartutsnitt=10.400838,63.413473,10.409319,63.420446&srid=4326
// https://www.vegvesen.no/nvdb/api/v2/vegobjekter/24?kartutsnitt=10.4,63.4,10.42,63.5&srid=4326

/* Frontend can do this query anytime
for i in vegobjekttyper:
    query api/v2/vegobjekter/i?kartutsnitt
    save to stuff
for i in stuff:
    get vegobjekter in stuff
    add to database
*/