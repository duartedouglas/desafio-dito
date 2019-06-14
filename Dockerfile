FROM node:10-alpine

WORKDIR D:\Users\douglas2\Documents\Github\js\docker\teste
COPY . ./

RUN yarn

COPY . ./

ENV PORT=9080

EXPOSE 9080
CMD yarn start

