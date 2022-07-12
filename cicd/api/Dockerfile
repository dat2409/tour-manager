FROM node:14-alpine

WORKDIR /app
COPY server/package.json .
RUN yarn install
COPY ./server .
CMD ["yarn", "start"]
