import { IconLoader } from "@assets/index";
import { useMutationDeleteTask } from "@queries/checklist.query";

interface ITaskProps {
  id: string;
  name: string;
  color: string;
}
export const Task = ({ id, color, name }: ITaskProps) => {
  const { mutate: deleteTask, isLoading: deleteLoading } =
    useMutationDeleteTask();

  const handleDelTask = (id: string) => {
    deleteTask(id);
  };

  return (
    <div
      className={
        "flex cursor-pointer justify-center p-2 text-center " +
        (deleteLoading ? "cursor-wait" : "")
      }
      style={{
        // Linear gradient on border
        border: "1px solid " + (color[0] === "#" ? color : ""),
        borderImageSlice: color[0] === "l" ? "1" : "",
        borderImageSource: color[0] === "l" ? color : "",
      }}
      onClick={() => (deleteLoading ? null : handleDelTask(id))}
    >
      {deleteLoading ? (
        <IconLoader color={color[0] === "l" ? color.split(",")[1] : color} />
      ) : (
        name
      )}
    </div>
  );
};
