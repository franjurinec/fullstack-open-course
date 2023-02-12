FROM node:16

ENV NODE_ENV production
ENV DEBUG playground:*

WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --only=production

USER node
CMD ["node", "./bin/www"]