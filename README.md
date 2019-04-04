# Enkelt visualiseringsverktøy for NAP
Dette visualiseringsverktøyet inneholder en node.js server som tar i mot informasjon fra en bil tilknyttet NAP. 
Informasjonen blir så videreformidlet via websockets til klienter, tilgjengelig som en nettside. 
Denne nettsiden blir tilgjengelig på localhost:3000.

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
Bruk npm til å installere express og socketio
```
$ npm install
```
Deretter kan tjenesten startes ved hjelp av npm
```
$ npm start
```

## Open streetmap fra Mapbox

### API tokens

## Hente data fra Vegkart.no
