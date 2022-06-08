FROM node:16-alpine

WORKDIR /srv

COPY . .

EXPOSE 3000
VOLUME /srv/app/node_modules
VOLUME /srv/app/.next

WORKDIR /srv/app

CMD ["yarn", "start"]
