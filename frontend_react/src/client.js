import client from '@sanity/client';

export default client({
    projectId: 'wsp1bmu9',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2022-09-14',
});
