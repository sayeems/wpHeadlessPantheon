# pull the official base image
FROM node:16
# set working direction
WORKDIR /app
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i
# add app
COPY . /app

EXPOSE 4040
# start app
CMD ["npm", "start"]