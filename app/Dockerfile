FROM jelastic/nodejs:16.17.0-supervisor

WORKDIR /home/jelastic/ROOT

COPY . .

EXPOSE 3000

VOLUME /home/jelastic/ROOT/node_modules
VOLUME /home/jelastic/ROOT/.next

CMD ["yarn", "start"]
