import { useContext, useEffect, useState } from 'react';
import { App, ConfigProvider, Input, Popover } from 'antd';

import {
  IconAddTask,
  IconHidden,
  IconLoader,
  IconPalette,
  IconSMS,
  IconTrash,
  IconVisible
} from '@assets/index';
import {
  Button,
  ModalConfirmDelete,
  PopOverPalette,
  Task
} from '@components/index';
import { ITask } from '@interfaces/index';
import {
  useMutationCreateTask,
  useMutationUpdateCategory
} from '@queries/index';
import AppContext, { IAppContext } from '@services/AppContext';
import { capitalizeFirstLetter, messageObject } from '@utils/formatters';

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
  tasks
}: ICategoryProps) => {
  const { message } = App.useApp();
  const { darkMode } = useContext<IAppContext>(AppContext);
  const [inputValue, setInputValue] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const { mutate: updateCategory, isLoading: loadingUpdate } =
    useMutationUpdateCategory();
  const { mutate: createTask, isLoading, isSuccess } = useMutationCreateTask();

  const handleAddTask = (e: any) => {
    e.preventDefault();
    if (!inputValue) {
      message.success(messageObject('warning', "Il n'y a rien à ajouter !"));
      return;
    }
    createTask({
      name: inputValue,
      categoryId: id
    });
  };

  useEffect(() => {
    if (isSuccess) setInputValue('');
  }, [isSuccess]);

  return (
    <>
      <ModalConfirmDelete
        showModal={isDeleting}
        setShowModal={setIsDeleting}
        categoryId={id}
        categoryName={name}
      />

      <div data-testid="category" className="h-fit w-[95%] max-w-[25rem]">
        <header
          className="rounded-tl-xl px-4 text-zinc-100"
          style={{ background: color }}>
          <div className="flex items-center justify-between py-2">
            <Popover
              content={
                <PopOverPalette
                  categoryId={id}
                  setOpenPopover={setOpenPopover}
                />
              }
              title="Choisissez une couleur"
              trigger="click"
              open={openPopover}
              onOpenChange={() => setOpenPopover(!openPopover)}>
              <IconPalette className="cursor-pointer" />
            </Popover>
            <a
              href={
                'sms:?&body=Voici ma liste ' +
                name +
                ' :%0a- ' +
                tasks.map((task) => task.name).join('%0a- ')
              }
              className="cursor-pointer hover:text-zinc-100 dark:hover:text-zinc-900">
              <IconSMS />
            </a>
            {loadingUpdate ? (
              <IconLoader />
            ) : hidden ? (
              <IconHidden
                onClick={() =>
                  updateCategory({
                    payload: {
                      isHidden: false
                    },
                    id
                  })
                }
                className="cursor-pointer"
              />
            ) : (
              <IconVisible
                onClick={() =>
                  updateCategory({
                    payload: {
                      isHidden: true
                    },
                    id
                  })
                }
                className="cursor-pointer"
              />
            )}
            <IconTrash
              className="cursor-pointer"
              onClick={() => setIsDeleting(true)}
            />
          </div>
          <h2 className="py-1 text-center">{capitalizeFirstLetter(name)}</h2>
        </header>

        {!hidden && !!tasks.length && (
          <div className="my-2 flex flex-col gap-2">
            {tasks.map((task, index) => (
              <Task key={index} id={task.id} name={task.name} color={color} />
            ))}
          </div>
        )}

        <footer className="flex">
          <form className="flex w-full text-zinc-100" onSubmit={handleAddTask}>
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    colorBgContainer: darkMode ? '#18181b' : 'white',
                    colorText: darkMode ? 'white' : 'black'
                  }
                }
              }}>
              <Input
                allowClear
                style={{
                  // Linear gradient on border
                  border: '1px solid ' + (color[0] === '#' ? color : ''),
                  borderImageSlice: color[0] === 'l' ? '1' : '',
                  borderImageSource: color[0] === 'l' ? color : ''
                }}
                id="task"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                data-testid="task-input"
              />
            </ConfigProvider>

            <Button
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              style={{
                background: color[0] === 'l' ? color.split(',')[1] : color
              }}
              className="rounded-br-xl px-3 py-2">
              <IconAddTask />
            </Button>
          </form>
        </footer>
      </div>
    </>
  );
};
