import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Category } from "@components/index";
import { categories, tasks } from "@mocks/index";

describe("Category", () => {
  const setup = () => {
    const queryClient = new QueryClient();
    const utils = render(
      <QueryClientProvider client={queryClient}>
        {categories.map((category, index) => (
          <Category
            key={index}
            id={category.id}
            color={category.color}
            hidden={category.isHidden}
            name={category.name}
            tasks={tasks.filter((task) => task.category === category.id)}
          />
        ))}
      </QueryClientProvider>,
    );

    const categoriesComponents = utils.getAllByTestId("category");

    return {
      categoriesComponents,
      ...utils,
    };
  };

  test("Are presents in DOM", () => {
    const { categoriesComponents } = setup();

    expect(categoriesComponents).toHaveLength(categories.length);
  });
});
