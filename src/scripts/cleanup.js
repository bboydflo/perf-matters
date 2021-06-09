const rimraf = require('rimraf')
const { promisify } = require('util')

const asyncRimRaf = promisify(rimraf)

const cleanup = () => {
    try {
        return Promise
            .all([
                asyncRimRaf('src/output'),
                asyncRimRaf('src/backend/**.js'),
                asyncRimRaf('*.log')
            ])
            .then(() => Promise.resolve(true))
    } catch(err) {
        console.error(err)
        return Promise.reject(err)
    }
}

;(async () => {
    const result = await cleanup()
    if (result instanceof Error) {
        throw result
    }
})()
