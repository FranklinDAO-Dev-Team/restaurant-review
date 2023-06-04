FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

ENTRYPOINT [ "npx", "serve", "-s", "dist" ]