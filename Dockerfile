FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn

COPY ./ ./

CMD ["yarn", "dev"]

EXPOSE 3000