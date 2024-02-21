import { http, HttpResponse } from 'msw';

import { categories, loginResponseMock, tasks } from '@mocks/index';
import { baseURL } from '@queries/axios';

export const endpoint = (endpoint: string): string => baseURL + endpoint;

export const handlers = [
  // Task
  http.post(endpoint('tasks'), () => {
    return HttpResponse.json(tasks[0]);
  }),
  http.get(endpoint('tasks'), () => {
    return HttpResponse.json(tasks);
  }),
  http.delete(endpoint('tasks/:id'), () => {
    return HttpResponse.json(undefined);
  }),
  // Category
  http.post(endpoint('category'), () => {
    return HttpResponse.json(categories[0]);
  }),
  http.get(endpoint('category'), () => {
    return HttpResponse.json(categories);
  }),
  http.patch(endpoint('category/:id'), () => {
    return HttpResponse.json(categories[1]);
  }),
  http.delete(endpoint('category/:id'), () => {
    return HttpResponse.json(undefined);
  }),
  // Login
  http.post(endpoint('token/'), () => {
    return HttpResponse.json(loginResponseMock);
  }),
  http.post(endpoint('token/refresh/'), () => {
    return HttpResponse.json(loginResponseMock);
  }),
  http.post(endpoint('register'), () => {
    return HttpResponse.json({ message: 'User created successfully' });
  })
];
