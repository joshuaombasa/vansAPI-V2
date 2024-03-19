FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

USER node

ENV MONGODB_URI="mongodb+srv://joshuaombasa:bkkFR31gC4sYBZWv@cluster0.3ugyr3e.mongodb.net/" \
    PORT=3003

CMD npm start