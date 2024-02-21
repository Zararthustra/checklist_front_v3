import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { NotFound } from './NotFound';

describe('Page NotFound', () => {
  test('Is present in DOM', async () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    const element = await screen.findByTestId('notfound');
    expect(element).toBeInTheDocument();
  });
});
