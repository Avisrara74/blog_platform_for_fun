export const url = 'https://conduit.productionready.io/api/';
export const signUpUrl = `${url}users`;
export const signInUrl = `${url}users/login`;
export const articlesUrl = `${url}articles`;
export const userProfileUrl = `${url}user`;

export const oneArticleUrl = (queryParam) => `${articlesUrl}/${queryParam}`;

export const changeLikeUrl = (queryParam) => `${articlesUrl}/${queryParam}/favorite`;
