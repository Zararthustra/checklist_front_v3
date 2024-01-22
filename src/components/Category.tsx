import { Input } from "antd";
import { useState } from "react";

import {
  IconAddTask,
  IconHidden,
  IconPalette,
  IconTrash,
  IconVisible,
} from "@assets/index";
import { Button } from "@components/index";
import { ITask } from "@interfaces/index";
import { capitalizeFirstLetter } from "@utils/formatters";

interface ICategoryProps {
  name: string;
  color: string;
  tasks: ITask[];
}

export const Category = ({ name, color, tasks }: ICategoryProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-[90%] max-w-[25rem]">
      <header
        className="rounded-tl-xl px-4 text-zinc-100 dark:text-zinc-900"
        style={{ background: color }}
      >
        <div className="flex items-center justify-between py-2">
          <IconPalette />
          {visible ? (
            <IconVisible onClick={() => setVisible(!visible)} />
          ) : (
            <IconHidden onClick={() => setVisible(!visible)} />
          )}
          <IconTrash />
        </div>
        <h2 className="text-center">{capitalizeFirstLetter(name)}</h2>
      </header>

      <div className="my-2 flex flex-col gap-2">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="p-2 text-center"
            style={{
              // Linear gradient on border
              border: "1px solid " + (color[0] === "#" ? color : ""),
              borderImageSlice: color[0] === "l" ? "1" : "",
              borderImageSource: color[0] === "l" ? color : "",
            }}
          >
            {task.name}
          </div>
        ))}
      </div>

      <footer className="flex">
        <form className="flex w-full">
          <Input allowClear id="task" autoComplete="task" />
          <Button
            type="submit"
            style={{
              background: color[0] === "l" ? color.split(",")[1] : color,
            }}
            className="ml-1 rounded-br-xl px-2"
          >
            <IconAddTask className="text-zinc-100 dark:text-zinc-900" />
          </Button>
        </form>
      </footer>
    </div>
  );
};
