import { expect, test, describe, assertType } from "vitest";

import {
  createCategory,
  createTask,
  removeCategory,
  removeTask,
  retrieveCategories,
  retrieveTasks,
  updateCategory,
} from "@queries/index";
import { categories, tasks } from "@mocks/index";
import { ICategory, ITask } from "@interfaces/index";

describe("Queries \t Task", () => {
  test("Create task", async () => {
    const response = await createTask({
      name: "my task 1",
      categoryId: "6b7727d5-e8f8-4d4b-b084-30ced6ceb96e",
    });
    expect(response).toStrictEqual(tasks[0]);
    assertType<ITask>(response);
  });

  test("Retrieve tasks", async () => {
    const response = await retrieveTasks();
    expect(response).toStrictEqual(tasks);
    assertType<ITask[]>(response);
  });

  test("Remove task", async () => {
    const response = await removeTask("411ac8bb-e1e2-4616-8f91-24b03c90f634");
    expect(response).toStrictEqual(undefined);
  });
});

describe("Queries \t Category", () => {
  test("Create category", async () => {
    const response = await createCategory({
      name: "my category",
      color: "#0f0",
    });
    expect(response).toStrictEqual(categories[0]);
    assertType<ICategory>(response);
  });

  test("Retrieve categories", async () => {
    const response = await retrieveCategories();
    expect(response).toStrictEqual(categories);
    assertType<ICategory[]>(response);
  });

  test("Update category", async () => {
    const response = await updateCategory({
      payload: { color: "#0ff" },
      id: "411ac8bb-e1e2-4616-8f91-24b03c90f634",
    });
    expect(response).toStrictEqual(categories[1]);
    assertType<ICategory>(response);
  });

  test("Remove category", async () => {
    const response = await removeCategory(
      "411ac8bb-e1e2-4616-8f91-24b03c90f634",
    );
    expect(response).toStrictEqual(undefined);
  });
});
