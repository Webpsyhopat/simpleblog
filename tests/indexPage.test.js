import { screen, waitFor } from '@testing-library/react';
import { getPage } from 'next-page-tester';

import { posts } from '../mocks/mocks'
import { server, rest } from '../mocks/server';
import { API_URL } from '../mocks/handlers'



test('displays the list of posts', async () => {
  const { render } = await getPage({ route: '/' });

  render();

  await waitFor(() => {
    posts.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
