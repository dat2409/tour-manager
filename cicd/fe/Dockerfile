FROM node:14-alpine

WORKDIR /app
COPY client/package.json .
RUN yarn install
COPY ./client .
RUN yarn build
CMD ["yarn", "start"]
