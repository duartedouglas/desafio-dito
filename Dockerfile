FROM node:10-alpine

WORKDIR .
COPY . ./

RUN yarn

COPY . ./

ENV PORT=80
ENV DBPORT=27017

EXPOSE 80
CMD yarn start

