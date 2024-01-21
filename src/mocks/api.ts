import { HttpResponse, http } from "msw";

import { baseURL } from "@queries/axios";
import { userMock, loginResponseMock } from "@mocks/index";

export const endpoint = (endpoint: string): string => baseURL + endpoint;

export const handlers = [
  // TEMPLATE
  http.post(endpoint("/endpoint"), () => {
    return HttpResponse.json({ message: "User created successfully" });
  }),
  http.get(endpoint("/endpoint"), () => {
    return HttpResponse.json([{ key: "value" }]);
  }),
  http.get(endpoint("/endpoint/:id"), () => {
    return HttpResponse.json({ key: "value" });
  }),
  http.patch(endpoint("/endpoint/:id"), () => {
    return HttpResponse.json({ message: "User updated successfully" });
  }),
  http.delete(endpoint("/endpoint/:id"), () => {
    return HttpResponse.json(undefined);
  }),
  // USER
  http.get(endpoint("/users/:userId"), () => {
    return HttpResponse.json(userMock);
  }),
  http.post(endpoint("/token/"), () => {
    return HttpResponse.json(loginResponseMock);
  }),
  http.post(endpoint("/token/refresh/"), () => {
    return HttpResponse.json(loginResponseMock);
  }),
  http.post(endpoint("/register"), () => {
    return HttpResponse.json({ message: "User created successfully" });
  }),
];
