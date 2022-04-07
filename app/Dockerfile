FROM node:alpine

WORKDIR /app

COPY . .

EXPOSE 3000

VOLUME /app/node_modules
VOLUME /app/.next

CMD ["yarn", "start"]
