import { Input } from "antd";
import { App, ConfigProvider } from "antd";
import { useContext, useEffect, useState } from "react";

import {
  IconAddTask,
  IconHidden,
  IconPalette,
  IconTrash,
  IconVisible,
} from "@assets/index";
import { ITask } from "@interfaces/index";
import { Button, Task } from "@components/index";
import { useMutationCreateTask } from "@queries/index";
import AppContext, { IAppContext } from "@services/AppContext";
import { capitalizeFirstLetter, messageObject } from "@utils/formatters";

interface ICategoryProps {
  id: string;
  name: string;
  color: string;
  hidden: boolean;
  tasks: ITask[];
}

export const Category = ({
  id,
  name,
  color,
  hidden,
  tasks,
}: ICategoryProps) => {
  const { message } = App.useApp();
  const [inputValue, setInputValue] = useState("");
  const { darkMode } = useContext<IAppContext>(AppContext);
  const { mutate, isLoading, isSuccess } = useMutationCreateTask();

  const handleAddTask = (e: any) => {
    e.preventDefault();
    if (!!!inputValue) {
      message.success(messageObject("warning", "Il n'y a rien à ajouter !"));
      return;
    }
    mutate({
      name: inputValue,
      categoryId: id,
    });
  };

  useEffect(() => {
    if (isSuccess) setInputValue("");
  }, [isSuccess]);

  return (
    <div className="w-[95%] max-w-[25rem]">
      <header
        className="rounded-tl-xl px-4 text-zinc-100 dark:text-zinc-900"
        style={{ background: color }}
      >
        <div className="flex items-center justify-between py-2">
          <IconPalette />
          {hidden ? (
            <IconHidden
            //  onClick={() => setVisible(!visible)}
            />
          ) : (
            <IconVisible
            // onClick={() => setVisible(!visible)}
            />
          )}
          <IconTrash />
        </div>
        <h2 className="py-1 text-center">{capitalizeFirstLetter(name)}</h2>
      </header>

      <div className="my-2 flex flex-col gap-2">
        {tasks.map((task, index) => (
          <Task key={index} id={task.id} name={task.name} color={color} />
        ))}
      </div>

      <footer className="flex">
        <form
          className="flex w-full text-zinc-100 dark:text-zinc-900"
          onSubmit={handleAddTask}
        >
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorBgContainer: darkMode ? "#18181b" : "white",
                  colorText: darkMode ? "white" : "black",
                },
              },
            }}
          >
            <Input
              allowClear
              id="task"
              autoComplete="task"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
          </ConfigProvider>

          <Button
            type="submit"
            disabled={isLoading}
            loading={isLoading}
            style={{
              background: color[0] === "l" ? color.split(",")[1] : color,
            }}
            className="ml-1 rounded-br-xl px-3 py-2"
          >
            <IconAddTask className="" />
          </Button>
        </form>
      </footer>
    </div>
  );
};
