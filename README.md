# Getting Started
This React app listens to blocks created on [port 8888 via eosjs](https://gist.github.com/chris-allnutt/998b2382ad1bcd60c52598ca02535231).  It uses Apollo GraphQL to send data from the server to the client via a websocket connection.

Tools used:
- [react-create-app](https://github.com/facebook/create-react-app)
- [eosjs](https://github.com/EOSIO/eosjs)
- [apollo graphql](https://www.apollographql.com/)

## To setup the application
```bash
yarn
```

## To start the application
Start the eosjs docker image with 

```bash
docker-compose up
```

Then for this application run
```bash
npm run dev
```
Note: yarn was having some issues with async and I didn't want to bloat the app by adding babel

## To test the application
```bash
npm test
```
