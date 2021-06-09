import { navigationTiming } from "./puppeteer-tests/navigation-timing";
import { pageSpeedInsights } from "./puppeteer-tests/pagespeed-insights";
import { withBrowserContext, withPage } from "./utils/puppeteer-utils";

const url = process.env.TEST_SITE_URL || "https://florin-cosmin.dk";

(async () => {
  const getAvgPageLoads = async (trials: number) => {
    const urls = new Array(trials).fill(url);

    const pageLoads = await withBrowserContext<number[]>(
      async (browserContext) => {
        return await Promise.all(
          urls.map((url) =>
            withPage<number>(browserContext)(
              async (page) => await navigationTiming({ page, url })
            )
          )
        );
      }
    );
    const averagePageLoad =
      pageLoads.reduce((prev, curr) => prev + curr, 0) / pageLoads.length;

    return pageLoads.reduce(
      (acc, curr, i) => {
        const currKey = `pageLoad${i}`;
        if (!acc[currKey]) {
          acc[currKey] = curr;
        }

        return acc;
      },
      { averagePageLoad } as { [k: string]: number }
    );
  };

  const getPageSpeedInsights = async (trials: number) => {
    const urls = new Array(trials).fill(url);

    const psis = await Promise.all(
      urls.map((url) => pageSpeedInsights({ url }))
    );
    const avgPageSpeedScore =
      psis.reduce((acc, curr) => acc + (curr as unknown as number), 0) /
      psis.length;

    const res = psis.reduce(
      (acc, curr, index, arr) => {
        // @ts-ignore TODO: improve typing
        acc["ps" + index] = curr;
        return acc;
      },
      { avgPageSpeedScore }
    );

    return res;
  };

  const report = await Promise.all([
    getAvgPageLoads(3),
    getPageSpeedInsights(2),
  ]);

  console.log(report);
})();
