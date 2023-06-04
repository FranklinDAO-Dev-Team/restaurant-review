# Restaurant Review DApp
This is a simple restaurant review dApp built to teach the full-stack web3 development workflow.

### Environment File Configuration

Before trying to run the application, set up the following environment files:

##### `backend/.env`
```
PORT=4000
RPC_URL=
DB_SOURCE=db.sqlite
CONTRACT_ARTIFACT_PATH=contracts/RestaurantReview.json
CONTRACT_ADDRESS=
MAPBOX_URL=https://api.mapbox.com
MAPBOX_TOKEN=
PINATA_URL=https://api.pinata.cloud
PINATA_TOKEN=
IPFS_GATEWAY_URL=https://ipfs.io
```

##### `frontend/.env`
```
VITE_BASE_SERVER_URL=http://localhost:4000
VITE_MAPBOX_TOKEN=
VITE_CONTRACT_ADDRESS=
```

### Running the Application

1. Download [docker](https://www.docker.com/get-started) and [docker-compose](https://docs.docker.com/compose/install/).
2. Clone this repository.
3. Run `docker compose up --build` in the root directory of this repository.
4. Open `localhost:3000` in your browser to interact with the application.

### Manually Building the Application

1. Download [node](https://nodejs.org/en/download/).
2. Clone this repository.
3. `cd` into the `contracts` directory.
    1. Run `npm install` to install the dependencies.
    2. Run `npx hardhat node` to start the node.
    3. Run `npx hardhat run scripts/deploy.js --network localhost` to deploy the contracts.
4. `cd` into the `backend` directory.
    1. Run `npm install` to install the dependencies.
    2. Run `npm run dev` to start the server.
5. `cd` into the `frontend` directory.
    1. Run `npm install` to install the dependencies.
    2. Run `npm run dev` to start the frontend.
