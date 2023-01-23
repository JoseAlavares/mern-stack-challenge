FROM node:alpine
LABEL maintainer="Jose Francisco Alvarez Valdez<alvaresvaldes89@gmail.com>"
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install
USER root
RUN npm install -g pm2
EXPOSE 3001
CMD ["pm2-runtime", "index.js"]