import { HttpResponse, http } from "msw";

import { baseURL } from "@queries/axios";
import { userMock, loginResponseMock } from "@mocks/index";

export const endpoint = (endpoint: string): string => baseURL + endpoint;

export const handlers = [
  // Task
  http.post(endpoint("tasks"), () => {
    return HttpResponse.json({
      id: "0d92b2a1-1d5d-4280-a914-ee0448da381d",
      name: "my task",
      owner: 4,
      category: "6b7727d5-e8f8-4d4b-b084-30ced6ceb96e",
    });
  }),
  http.get(endpoint("tasks"), () => {
    return HttpResponse.json([
      {
        id: "0d92b2a1-1d5d-4280-a914-ee0448da381d",
        name: "my task",
        owner: 4,
        category: "6b7727d5-e8f8-4d4b-b084-30ced6ceb96e",
      },
    ]);
  }),
  http.delete(endpoint("tasks/:id"), () => {
    return HttpResponse.json(undefined);
  }),
  // Category
  http.post(endpoint("category"), () => {
    return HttpResponse.json({
      id: "411ac8bb-e1e2-4616-8f91-24b03c90f634",
      name: "my category",
      color: "#0f0",
      isHidden: null,
      owner: 4,
    });
  }),
  http.get(endpoint("category"), () => {
    return HttpResponse.json([
      {
        id: "411ac8bb-e1e2-4616-8f91-24b03c90f634",
        name: "my category",
        color: "#0f0",
        isHidden: null,
        owner: 4,
      },
    ]);
  }),
  http.patch(endpoint("category/:id"), () => {
    return HttpResponse.json({
      id: "411ac8bb-e1e2-4616-8f91-24b03c90f634",
      name: "my category",
      color: "#0ff",
      isHidden: null,
      owner: 4,
    });
  }),
  http.delete(endpoint("category/:id"), () => {
    return HttpResponse.json(undefined);
  }),
  // Login
  http.post(endpoint("token/"), () => {
    return HttpResponse.json(loginResponseMock);
  }),
  http.post(endpoint("token/refresh/"), () => {
    return HttpResponse.json(loginResponseMock);
  }),
  http.post(endpoint("register"), () => {
    return HttpResponse.json({ message: "User created successfully" });
  }),
];
