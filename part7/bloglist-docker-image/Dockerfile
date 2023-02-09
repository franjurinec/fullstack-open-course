FROM node:18-slim
ENV NODE_ENV=production

WORKDIR /app

COPY ["bloglist/package.json", "bloglist/package-lock.json", "./"]
RUN npm install --production

ADD bloglist /app
ADD bloglist-frontend/build /app/build

CMD [ "node", "." ]
