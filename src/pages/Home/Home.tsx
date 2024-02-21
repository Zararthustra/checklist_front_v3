import { useState } from 'react';
import { Empty } from 'antd';

import { IconLoader } from '@assets/index';
import { Category, Login, ModalReconnect, Navbar } from '@components/index';
import {
  useQueryRetrieveCategories,
  useQueryRetrieveTasks
} from '@queries/index';
import { getLS } from '@services/localStorageService';

export const Home = () => {
  const [isAuth, setIsAuth] = useState(!!getLS('accessToken'));
  const {
    data: categories,
    error: errorCategories,
    isLoading: loadingCategories
  } = useQueryRetrieveCategories(isAuth);
  const {
    data: tasks,
    error: errorTasks,
    isLoading: loadingTasks
  } = useQueryRetrieveTasks(isAuth);

  if (!isAuth) return <Login setIsAuth={setIsAuth} />;
  if (!tasks || !categories)
    return (
      <>
        <Navbar />
        <main data-testid="home-nodata" className="mt-[100px]">
          <Empty
            description={
              <p className="dark:text-zinc-100">
                Une erreur est survenue, veuillez vous reconnecter.
              </p>
            }
          />
        </main>
      </>
    );
  return (
    <>
      {(errorTasks || errorCategories) && (
        <ModalReconnect
          showReconnectModal={
            errorTasks?.status === 401 || errorCategories?.status === 401
          }
        />
      )}

      <Navbar />
      <main
        data-testid="home"
        className="mt-[50px] flex flex-col items-center px-2 dark:text-zinc-100">
        <div className="my-5 flex w-full flex-wrap justify-center gap-5">
          {(loadingCategories || loadingTasks) && (
            <div className="flex animate-pulse flex-col items-center gap-2">
              <IconLoader width={100} height={100} />
              <i>Chargement de la checklist...</i>
            </div>
          )}
          {categories &&
            tasks &&
            categories.map((category, index) => (
              <Category
                key={index}
                id={category.id}
                color={category.color}
                hidden={category.isHidden}
                recurrent={category.isRecurrent}
                name={category.name}
                tasks={tasks.filter((task) => task.category === category.id)}
              />
            ))}
        </div>
      </main>
    </>
  );
};
