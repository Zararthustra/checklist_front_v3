import { assertType, describe, expect, test } from "vitest";

import { ILoginResponse } from "@interfaces/index";
import { loginRequestMock, loginResponseMock } from "@mocks/index";
import { login, reconnect, register } from "@queries/index";

describe("Queries => User", () => {
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
