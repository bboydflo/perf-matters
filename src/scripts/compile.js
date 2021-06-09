const esbuild = require('esbuild')
const { glob } = require('glob')

;(async () => {

    try {
        const entryPoints = glob.sync('src/ts/**/*.ts')

        await esbuild.build({
            platform: 'node',
            entryPoints: [
                ...entryPoints
            ],
            target: 'node12',
            format: 'cjs',
            outdir: './output'
        })
    } catch (err) {
        console.error(err)
    }
})()
