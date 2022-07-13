FROM node:14-alpine

WORKDIR /app
COPY server/package.json .
RUN yarn install
COPY ./server .
RUN yarn prisma generate
CMD ["yarn", "start"]
