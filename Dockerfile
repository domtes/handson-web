FROM node:latest
MAINTAINER Domenico Testa <dte@bit4id.com>

ENV NODE_ENV=development
USER node

COPY package.json /home/node
RUN cd /home/node && npm install --save-dev

RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY ./src .

EXPOSE 3000
EXPOSE 3001
CMD ["sh", "-c", "/home/node/node_modules/gulp-cli/bin/gulp.js"]
