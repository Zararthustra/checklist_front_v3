import { useState } from "react";

import {
  useQueryRetrieveCategories,
  useQueryRetrieveTasks,
} from "@queries/index";
import { IconLoader } from "@assets/index";
import { getLS } from "@services/localStorageService";
import { Category, Login, ModalReconnect, Navbar } from "@components/index";

export const Home = () => {
  const [isAuth, setIsAuth] = useState(!!getLS("accessToken"));
  const {
    data: categories,
    error: errorCategories,
    isLoading: loadingCategories,
  } = useQueryRetrieveCategories(isAuth);
  const {
    data: tasks,
    error: errorTasks,
    isLoading: loadingTasks,
  } = useQueryRetrieveTasks(isAuth);

  if (!isAuth) return <Login setIsAuth={setIsAuth} />;

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
      <main className="mt-[50px] flex flex-col items-center px-2 dark:text-zinc-100">
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
                name={category.name}
                tasks={tasks.filter((task) => task.category === category.id)}
              />
            ))}
        </div>
      </main>
    </>
  );
};
