FROM node:18 AS build-stage

WORKDIR /app
COPY ./bloglist-frontend /app

ENV CI=true

RUN npm ci
RUN npm run build

FROM node:18-slim
ENV NODE_ENV=production

WORKDIR /app

COPY ["bloglist/package.json", "bloglist/package-lock.json", "./"]
RUN npm install --production

COPY ./bloglist /app
COPY --from=build-stage /app/build /app/build

CMD [ "node", "." ]
