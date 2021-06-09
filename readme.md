# How it works

To begin using this tool do the following:

```sh
# install all the necessary dependencies
npm i

# compile the tool source code from ts to js
npm run build

# clean compiled code
npm run cleanup
```

## Test (run typescript typechecking)

```sh
npm test
```

## Docker

> First make sure you are in the root folder of this project and docker is up and running

Build the image

```sh
docker build -t extract-perf-metrics .
```

Run the tests for a specific website url

```sh
docker run -e TEST_SITE_URL='{YOUR_SITE_URL_GOES_HERE}' extract-perf-metric
```

> This tool can also be used directly from nodejs: `TEST_SITE_URL=https://google.com npm start`
