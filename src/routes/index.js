export const mainUrl = '/jm_blog/';

export const signInUrl = `${mainUrl}sign-in`;

export const signUpUrl = `${mainUrl}/sign-up`;

export const editProfileUrl = `${mainUrl}/edit-profile`;

export const createArticleUrl = `${mainUrl}/create-article`;

export const articleUrl = (slug = 'slug') => `${mainUrl}/article:${slug}`;

export const editArticleUrl = (slug = 'slug') => `${mainUrl}/edit-article:${slug}`;
