import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Empty } from 'antd';

import { IconLoader, IconLogin, IconReset } from '@assets/index';
import {
  Button,
  Category,
  Login,
  ModalReconnect,
  Navbar
} from '@components/index';
import {
  useQueryRetrieveCategories,
  useQueryRetrieveTasks
} from '@queries/index';
import { clearLS, getLS } from '@services/localStorageService';

export const Home = () => {
  const navigate = useNavigate();
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

  const handleLogout = () => {
    clearLS();
    navigate(0);
  };

  if (!isAuth) return <Login setIsAuth={setIsAuth} />;

  if (loadingCategories || loadingTasks)
    return (
      <>
        <Navbar />
        <main
          data-testid="home-loading"
          className="mt-[50px] flex flex-col items-center px-2 dark:text-zinc-100">
          <div className="my-5 flex w-full flex-wrap justify-center gap-5">
            <div className="flex animate-pulse flex-col items-center gap-2">
              <IconLoader width={100} height={100} />
              <i>Chargement de la checklist...</i>
            </div>
          </div>
        </main>
      </>
    );

  if (!tasks || !categories)
    return (
      <>
        <Navbar />
        <main data-testid="home-nodata" className="mt-[100px]">
          <Empty
            description={
              <div className="flex flex-col items-center justify-center gap-5">
                <p className="dark:text-zinc-100">
                  Impossible de récupérer les données.
                </p>
                <div className="flex flex-col gap-1">
                  <Button primary onClick={handleLogout}>
                    <IconLogin />
                    Se reconnecter
                  </Button>
                  <Button secondary onClick={() => navigate(0)}>
                    <IconReset /> Recharger la page
                  </Button>
                </div>
              </div>
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
