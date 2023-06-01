FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENTRYPOINT [ "npx", "hardhat", "run", "scripts/deploy.ts", "--network", "node" ]