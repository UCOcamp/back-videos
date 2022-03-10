FROM node:16-alpine as ucocamp-users

WORKDIR /usr/src/app

ADD package.json /usr/src/app/

ADD package-lock.json /usr/src/app/

RUN npm i

ADD . .

EXPOSE 4001

CMD npm run dev