FROM node:16-alpine as ucocamp-videos

WORKDIR /usr/src/app

ADD package.json /usr/src/app/

ADD package-lock.json /usr/src/app/

RUN npm i

ADD . .

EXPOSE 3000

CMD npm run dev