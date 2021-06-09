import { Page } from 'puppeteer';

export const getDevToolsScreenshot = async ({ page, url}: {page: Page, url: string }) => {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // Drag and drop this JSON file to the DevTools Performance panel!
    await page.tracing.start({
        path: 'profile.json',
        screenshots: true
    });
    await page.goto(url);
    await page.tracing.stop();
};
