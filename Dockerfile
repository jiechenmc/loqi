FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn

COPY ./ ./

CMD ["yarn", "dev", "--host", "0.0.0.0"]

EXPOSE 5173