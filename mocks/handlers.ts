import { rest } from 'msw';

import { posts } from './mocks';

export const API_URL = 'https://simple-blog-api.crew.red/posts'
const handlers = [
  rest.get(API_URL, (_req, res, ctx) => {
    return res(ctx.json(posts));
  }),
];

export { handlers };