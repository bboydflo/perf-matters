# https://github.com/Zenika/alpine-chrome
FROM zenika/alpine-chrome:with-puppeteer

# need this for the next apk add. TODO: improve
USER root

RUN apk add --no-cache tini

ARG NODE_ENV=production
ARG TEST_SITE_URL=https://florin-cosmin.dk

ENV NODE_ENV=${NODE_ENV}
ENV TEST_SITE_URL=${TEST_SITE_URL}

ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# set npm config
RUN npm config set loglevel warn \
    && npm config set progress false

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# install npm dependencies
RUN npm i

# copy source files
COPY . .

# test
RUN npm test

# build
RUN npm run build

# Tini is now available at /sbin/tini
ENTRYPOINT ["/sbin/tini", "--"]

# run command at start
CMD [ "node", "output/main.js" ]
