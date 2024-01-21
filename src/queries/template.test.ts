import { expect, test, describe } from "vitest";

import {
  create,
  retrieveAll,
  retrieveOne,
  update,
  remove,
} from "@queries/index";

describe("Queries => Template", () => {
  test("POST \t Create", async () => {
    const response = await create({ key: "value" });
    expect(response).toStrictEqual({ message: "User created successfully" });
  });

  test("GET \t Retrieve all", async () => {
    const response = await retrieveAll();
    expect(response).toStrictEqual([{ key: "value" }]);
  });

  test("GET \t Retrieve one", async () => {
    const response = await retrieveOne(1);
    expect(response).toStrictEqual({ key: "value" });
  });

  test("PATCH \t Update", async () => {
    const response = await update({ payload: { key: "value" }, id: 1 });
    expect(response).toStrictEqual({ message: "User updated successfully" });
  });

  test("DELETE \t Remove", async () => {
    const response = await remove(1);
    expect(response).toStrictEqual(undefined);
  });
});
