FROM node:18

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]