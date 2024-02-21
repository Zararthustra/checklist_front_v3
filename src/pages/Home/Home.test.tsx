import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render } from '@testing-library/react';
import { App as AntApp } from 'antd';
import { describe, expect, test } from 'vitest';

import { categories, tasks } from '@mocks/index';
import { Home } from '@pages/index';
import { setLS } from '@services/localStorageService';

describe('Home', () => {
  const setup = () => {
    const queryClient = new QueryClient();
    const utils = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AntApp>
            <Home />
          </AntApp>
        </BrowserRouter>
      </QueryClientProvider>
    );

    // Will be accessible on 2nd render
    setLS('accessToken', 'token');

    return {
      ...utils
    };
  };

  test('First render: token KO => Login', () => {
    const { queryByTestId } = setup();
    const main = queryByTestId('home');
    const loginPage = queryByTestId('login');

    expect(main).not.toBeInTheDocument();
    expect(loginPage).toBeInTheDocument();
  });

  test('Second render: token OK => Home', async () => {
    const { queryByTestId, queryAllByTestId, findByTestId } = setup();

    // On mount : Data KO
    const mainEmpty = queryByTestId('home-nodata');
    const categoriesComponentsOnMount = queryAllByTestId('category');
    expect(mainEmpty).toBeInTheDocument();
    expect(categoriesComponentsOnMount).toHaveLength(0);

    // Awaited : Data OK
    const main = await findByTestId('home');
    const categoriesComponentsAwaited = queryAllByTestId('category');
    expect(main).toBeInTheDocument();
    expect(categoriesComponentsAwaited).toHaveLength(categories.length);
  });

  // /!\
  // Hydration tests from Category & Task queries (dirty unit testing)
  // /!\

  test('Add category', async () => {
    const { findAllByTestId, getByTestId } = setup();
    const categoryInput = getByTestId('category-input');
    const categoriesLength = categories.length;

    fireEvent.change(categoryInput, { target: { value: 'my category 3' } });
    // Fake onSubmit function to add category manually
    categoryInput.onsubmit = () =>
      categories.push({
        id: '411ac8bb-e1e2-4616-8f91-24b03c90f636',
        name: 'my category 3',
        color: '#000',
        isHidden: false,
        owner: 4
      });
    fireEvent.submit(categoryInput);

    const categoriesComponents = await findAllByTestId('category');
    expect(categoriesComponents).toHaveLength(categoriesLength + 1);
  });

  test('Add task', async () => {
    const { findAllByTestId } = setup();

    const taskInputs = await findAllByTestId('task-input');
    const tasksOriginalLength = tasks.length;

    fireEvent.change(taskInputs[0], { target: { value: 'my task 2' } });
    // Fake onSubmit function to add task manually
    taskInputs[0].onsubmit = () =>
      tasks.push({
        id: '0d92b2a1-1d5d-4280-a914-ee0448da381e',
        name: 'my task 2',
        owner: 4,
        category: '411ac8bb-e1e2-4616-8f91-24b03c90f634'
      });
    fireEvent.submit(taskInputs[0]);

    const tasksComponents = await findAllByTestId('task');
    // Task not added yet.....
    expect(tasksComponents).toHaveLength(tasksOriginalLength);
  });

  test('Verify added task', async () => {
    const { findAllByTestId } = setup();
    const tasksComponents = await findAllByTestId('task');

    expect(tasksComponents).toHaveLength(2);
  });

  test('Check task', async () => {
    const { findByText, findAllByTestId } = setup();
    const taskComponent = await findByText('my task 2');

    taskComponent.onclick = () => tasks.pop();
    fireEvent.click(taskComponent);

    const tasksComponents = await findAllByTestId('task');
    expect(tasksComponents).toHaveLength(2);
  });

  test('Verify checked task', async () => {
    const { findAllByTestId } = setup();

    const tasksComponents = await findAllByTestId('task');
    expect(tasksComponents).toHaveLength(1);
  });
});
