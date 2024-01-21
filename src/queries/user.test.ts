import { expect, test, describe, assertType } from "vitest";

import { IUser, ILoginResponse } from "@interfaces/index";
import { login, reconnect, register, getUser } from "@queries/index";
import { userMock, loginRequestMock, loginResponseMock } from "@mocks/index";

describe("Queries => User", () => {
  test("GET \t User", async () => {
    const user = await getUser(1);
    expect(user).toStrictEqual(userMock);
    assertType<IUser>(user);
  });

  test("POST \t Register", async () => {
    const registerResponse = await register(loginRequestMock);
    expect(registerResponse).toStrictEqual({
      message: "User created successfully",
    });
    assertType<{ message: string }>(registerResponse);
  });

  test("POST \t Login", async () => {
    const loginResponse = await login(loginRequestMock);
    expect(loginResponse).toStrictEqual(loginResponseMock);
    assertType<ILoginResponse>(loginResponse);
  });

  test("POST \t Reconnect", async () => {
    const reconnectResponse = await reconnect(loginResponseMock.refresh);
    expect(reconnectResponse).toStrictEqual(loginResponseMock);
    assertType<ILoginResponse>(reconnectResponse);
  });
});
