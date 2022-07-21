import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'p7jkbbl7',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  //token: 'skgbFSC8XuL14ZnRMkMtg2QaWUMVEJwQLt5y3VEkwf8RBUyusmrVXOAfWPYaLb8EUYLoiGrkev81W0utefTm2peCxyMPEn0nAqdicXcXqNeQDEuqk00wG6ZkucxURHu58l1NsgP9e9Qoir55BOilsc8nuIzRAZgUgm941IhE9RqnDyOiZq0I',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
