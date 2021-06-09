import puppeteer, { BrowserContext, Page } from 'puppeteer';

// https://github.com/sashee/parallelize-puppeteer/blob/main/index.js
export const withBrowserContext = async <T>(fn: (browser: BrowserContext) => Promise<T>) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            // '--no-zygote',
            // '--disable-gpu',
            // '--single-process',
            // '--disable-dev-profile',
            /**
             * This will write shared memory files into /tmp instead of /dev/shm,
             * because Docker’s default for /dev/shm is 64MB
             * https://github.com/buildkite/docker-puppeteer/blob/master/example/integration-tests/index.test.js
             */
            '--disable-dev-shm-usage',
            '--allow-file-access-from-files',
            '--start-maximized',
            '--force-device-scale-factor=1',
            '--force-color-profile=generic-rgb',
            '--high-dpi-support=1'
        ],
        ignoreHTTPSErrors: true,
        defaultViewport: {
            width: 1200,
            height: 1600,
            deviceScaleFactor: 2
        }
    });
    const context = await browser.createIncognitoBrowserContext();
    try {
        return await fn(context);
    } finally {
        await browser.close();
    }
};

export const withPage = <T>(context: BrowserContext) => async (fn: (page: Page) => Promise<T>) => {
    const page = await context.newPage();
    try {
        return await fn(page);
    } finally {
        await page.close();
    }
};
