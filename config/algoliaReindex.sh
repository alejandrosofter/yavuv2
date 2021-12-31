#!/bin/bash
LOCATION=southamerica-east1\
  PROJECT_ID=yavu-98cac\
  ALGOLIA_APP_ID=YEIGHXO1BF\
  ALGOLIA_API_KEY=0e2670dbc0a23a0a5da70aef369d176b\
  ALGOLIA_INDEX_NAME=socios\
  COLLECTION_PATH=socios\
  FIELDS=nombre,apellido,dni,nroSocio,idUsuario,id,email\
  GOOGLE_APPLICATION_CREDENTIALS=./keysGoogle\
  npx firestore-algolia-search