FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npx hardhat compile

ENTRYPOINT ["npx", "hardhat", "run", "scripts/deploy.ts", "--network", "node"]