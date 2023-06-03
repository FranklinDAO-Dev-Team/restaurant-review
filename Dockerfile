FROM node:18

WORKDIR /app

COPY contracts/hardhat.config.ts contracts/package.json contracts/package-lock.json ./

RUN npm ci

ENTRYPOINT [ "npx", "hardhat", "node" ]