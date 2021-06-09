# Docker docs

This `Dockerfile` is inspired by official [nodejs docker guide](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/) and [puppeteer docs](https://github.com/puppeteer/puppeteer/blob/master/.ci/node12/Dockerfile.linux)

## Command to build the docker image

```sh
docker build -t extract-perf-metrics .

# to skip tests build the image with
docker build -t extract-perf-metrics --build-arg npm_skip_test=1 .
```

## Command to run a container using the latest built image

```sh
# with interactive shell
docker run -it extract-perf-metrics /bin/bash

# run default CMD, in detached mode
docker run -d --name extract-perf-metrics-image extract-perf-metrics

# with interactive shell + mount the current folder but not current folder's node_modules. useful to debug failing e2e tests
docker run --rm -it -v "$(pwd):/app" -v /app/node_modules extract-perf-metrics /bin/bash
```

## Command to inspect docker image logs

```sh
docker ps -s
docker logs <image-id>
```

## Clean docker images and containers

More details can be found [here](https://docs.docker.com/config/pruning/)

```sh
docker stop $(docker ps -a -q) # stop all containers
docker builder prune # removes cached layers
docker rmi $(docker images -a -q) # removes all images
docker image prune -a --filter "until=24h"
docker container prune --filter "until=24h"
```

## Test docker images

1. install snyk: `npm i -g snyk`
2. test an image: snyk test --docker node:alpine

## More docker resources

- [Example](https://github.com/Zenika/alpine-chrome/blob/master/Dockerfile) of an image that can run chromium inside alpine linux
- [Search](https://pkgs.alpinelinux.org/packages?name=chromium&branch=edge) in Alpine Linux package repository
- Learn more about building secure docker images [here](https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/)
