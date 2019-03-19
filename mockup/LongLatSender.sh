#!/bin/bash


longs=()
while IFS= read -r line; do
    longs+=( "$line" )
done < <( cut -d "," -f1 datapacket )

lats=()
while IFS= read -r line; do
    lats+=( "$line" )
done < <( cut -d "," -f2 datapacket )

for ((i=0;i<${#longs[@]};++i)); do
    echo http://localhost:3000/vehicle/0/long/"${longs[i]}"/lat/"${lats[i]}"
    curl -X POST http://localhost:3000/vehicle/0/long/"${longs[i]}"/lat/"${lats[i]}"
    sleep 1
done
