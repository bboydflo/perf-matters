import psi, { Options } from 'psi';

interface PageSpeedInsightsProps {
    url: string
}

export interface getPageSpeedInsights {
    (props: PageSpeedInsightsProps): Promise<object>
}

export const pageSpeedInsights: getPageSpeedInsights = async ({ url }) => {

    try {

        const psiOptions: Options = {
            key: 'AIzaSyChJ1cepyVZWu5N4lvx8KmcrMEhZ-LVbUE',
            strategy: 'mobile',
            links: true
        };

        const { data } = await psi(url, psiOptions);

        // return data
        return data.lighthouseResult.categories.performance.score
    } catch (err) {
        console.error(err);
        return null
    }
}
