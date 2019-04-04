# Enkelt visualiseringsverktøy for NAP
Dette visualiseringsverktøyet inneholder en node.js server som tar i mot informasjon fra en bil tilknyttet NAP. 
Informasjonen blir så videreformidlet via websockets til klienter, tilgjengelig som en nettside. 
Denne nettsiden blir tilgjengelig på localhost:3000. Javascriptbiblioteker til frontend er hentet fra unpkg, og kan derfor være i eldre versjoner. Leaflet 1.4.0, og jquery 3.3.1. Merk at for kun posisjonsoppdatering kan jquery fjernes som dependency da jquery brukes til å spørre vegvesen.no.

## Lisens
Verktøyet er under ISC lisensen, en veldig åpen og grei lisens. 

## Installasjon
Sørg for å ha en grei versjon av node tilgjengelig, jeg brukte 10.15.3.
Ha npm installert, jeg brukte 6.4.1.

Last ned kildekoden
```
$ git clone https://github.com/finninde/bil.git
$ cd bil
```
Legg inn maptoken manuelt i static/index.html, se [API tokens](### API tokens)

Bruk npm til å installere express og socketio
```
$ npm install
```
Deretter kan tjenesten startes ved hjelp av npm
```
$ npm start
```

## Open streetmap fra Mapbox
Tjenesten bruker open streetmap fra mapbox via leaflet. Leaflet kan bruke forskjellige kartbaser, og det er mulig å tjene sin egen. For informasjon om oppsett av leaflet, sjekk [leaflets tutorial](https://leafletjs.com/examples/quick-start/) 

### API tokens
Mapbox brukes som demo, merk at dersom mapbox og openstreetmap skal brukes er det viktig å beholde kreditering til begge. I historien finner du en gammel API nøkkel, den er deaktivert. For en ny nøkkel er det mulig å lage en selv hos [mapbox](https://www.mapbox.com/studio/account/tokens/), eller du kan spørre meg om å lage en for deg.

## Hente data fra Vegkart.no
En ønsket feature request var å legge inn alle vegobjekter fra vegvesen.no/nvdb/api/v2 som matchet området bilen befinner seg i. Her har jeg kommet litt på vei, og har tenkt følgende.
Vegobjektlisten er lastet ned og tjenes av bil-serveren, frontend henter dataen som ønskes å vise frem basert på disse vegobjektene. Denne lista hentes i json format ved hjelp av jquery.
```
var vegobjektListe = [];                                                                                                         
$.getJSON('http://localhost:3000/static/vegobjekter.json', function(data){                                                       
  vegobjektListe = data;                                                                                                         
});          
```
Det går an å be om alle objekter av en type vegobjekt (for eksempel skiltpunkt) for et kartutsnitt. Det brukes for å spørre om alle vegobjekter i vegobjektlista innenfor et kartutsnitt på følgende måte
```
var vegobjekter = [];                                                                                                            
for (const i in vegobjektListe){                                                                                   
  $.getJSON(vegobjektListe[i].href + '?kartutsnitt=10.4,63.4,10.42,63.5&srid=4326', function(data){                              
    for (const i in data.objekter){                                                                                              
      $.getJSON(data.objekter[i].href, function(vegobjekt){                                                                      
        vegobjekter.push(vegobjekt);                                                                                             
      });                                                                                                                        
    }                                                                                                                            
  });                                                                                                                            
}     
```
Vegobjektenes posisjon vil finnes i vegobjekter\[element\].geometri oppgitt vha. wkt, og srid formatet oppgitt i objektet. Typen finnes i klartekst. Tips: åpn opp nettleseren i inspektør modus, og ta en titt.

## Mockup
Mockup mappa inneholder et par shellscripts for å etterligne data som kan komme fra en bil. Det finnes en datapacket med longtitudes og latitudes det er tenkt at en bil kan sende, og et script longlatsender.sh som sender dem. longlatreset.sh setter bilen til \[0,0\].
Merk at shellscriptene trenger et shell miljø, og programmet curl installert. 
