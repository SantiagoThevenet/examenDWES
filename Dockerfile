FROM node:18

WORKDIR /src

ADD . .

RUN npm install 

EXPOSE 3001

CMD [ "node", "app.js" ]
