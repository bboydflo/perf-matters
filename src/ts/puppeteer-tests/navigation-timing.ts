import { Page } from 'puppeteer';

interface NavigationTimingProps {
    url: string,
    page: Page
}

export interface getNavigationTiming {
    (props: NavigationTimingProps): Promise<number>
}

export const navigationTiming: getNavigationTiming = async ({ url, page }) => {

    try {
        page.on('requestfailed', request => {
            console.error(request.url() + ' ' + request.failure().errorText);
        });

        await page.goto(url);

        await Promise.allSettled(
            [
                // https://pptr.dev/#?product=Puppeteer&version=v8.0.0&show=api-pagewaitfornavigationoptions
                page.waitForNavigation({
                    waitUntil: 'networkidle2' // consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.
                }),
                page.waitForNavigation({
                    waitUntil: 'domcontentloaded', // dom has loaded
                    // timeout: 0
                })
            ]
        );

        // https://developer.mozilla.org/en-US/docs/Web/Performance/Navigation_and_resource_timings
        const perfTiming = await page.evaluate(() => JSON.stringify(window.performance.getEntriesByType('navigation')[0]));
        const performanceTiming = JSON.parse(perfTiming) as PerformanceNavigationTiming;

        const load = performanceTiming.loadEventEnd - performanceTiming.loadEventStart;

        return load;
    } catch (err) {
        console.error(err);
        return -1;
    }
}
