FROM node:latest

ENV NODE_ENV=production

RUN mkdir /src
WORKDIR /src
COPY ./ ./

RUN npm install
RUN npm install express --save
RUN npm install pm2 -g
RUN npm install -g sequelize-cli

EXPOSE 3030

#CMD ["pm2-runtime", "index.js"]