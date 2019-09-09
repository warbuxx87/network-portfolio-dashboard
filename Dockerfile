FROM node:8-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python libc6-compat git && \
  npm install --quiet node-gyp -g && \
  npm install
RUN apk del native-deps

# Bundle app source
COPY . .

# Install Node Service Manager
RUN npm install pm2 -g

# Open Port
EXPOSE 3000

# Start Node With Service Manager
CMD ["pm2-runtime", "./bin/www"]
