# test-wall

## server
npm run server -> nodemon server.js

## client
npm run client -> cd client && npm run start

## dev
npm run dev -> concurrently --kill-others-on-fail \"npm run server\" \"npm run client\"",

## client-build
npm run client-build -> cd client && npm run build

## build-and-start
npm run build-and-start -> npm run client-build && node server.js