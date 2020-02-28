FROM node:8.12-alpine

RUN mkdir /var/server
COPY server /var/server

#RUN npm install -g nodemon
#RUN npm config set user 0
#RUN npm config set unsafe-perm true
WORKDIR /var/server

# RUN npm install superagent-charset --save
CMD ["node","server.js"]
