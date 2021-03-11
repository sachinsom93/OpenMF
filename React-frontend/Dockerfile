FROM node:lts-alpine

# make the current working directory "app"
WORKDIR /app

# copy 'package.json' and 'package-lock.json'
COPY package.json ./
COPY package-lock.json ./

# install project dependencies
RUN npm install

# copy project files to cwd (app)
COPY . ./

# start app
CMD ["npm", "start"]

