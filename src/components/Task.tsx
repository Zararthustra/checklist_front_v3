import { IconLoader, IconSuccess } from '@assets/index';
import { useMutationDeleteTask, useMutationUpdateTask } from '@queries/index';

interface ITaskProps {
  id: string;
  name: string;
  color: string;
  recurrent: boolean;
  disabled: boolean;
}

export const Task = ({ id, color, name, recurrent, disabled }: ITaskProps) => {
  const { mutate: deleteTask, isLoading: deleteLoading } =
    useMutationDeleteTask();
  const { mutate: updateTask, isLoading: loadingUpdate } =
    useMutationUpdateTask(disabled);

  const handleCheck = () => {
    if (deleteLoading || loadingUpdate) return;
    if (recurrent)
      updateTask({
        payload: {
          isDisabled: !disabled
        },
        id
      });
    else deleteTask(id);
  };

  return (
    <div
      data-testid="task"
      className={
        'flex cursor-pointer justify-center p-2 text-center transition-all ' +
        (deleteLoading || loadingUpdate ? 'cursor-wait' : '')
      }
      style={{
        background: disabled ? color : '',
        color: disabled ? 'white' : '',
        fontWeight: disabled ? '600' : '400',
        // Linear gradient on border
        border: '1px solid ' + (color[0] === '#' ? color : ''),
        borderImageSlice: color[0] === 'l' ? '1' : '',
        borderImageSource: color[0] === 'l' ? color : ''
      }}
      onClick={handleCheck}>
      {deleteLoading || loadingUpdate ? (
        <IconLoader color={color[0] === 'l' ? color.split(',')[1] : color} />
      ) : disabled ? (
        <div className="flex w-full items-center gap-2">
          <IconSuccess size={20} className="mr-auto" />
          <p className="w-full">{name}</p>
        </div>
      ) : (
        <p>{name}</p>
      )}
    </div>
  );
};
