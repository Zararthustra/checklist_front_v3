import { useState } from "react";

import {
  useQueryRetrieveCategories,
  useQueryRetrieveTasks,
} from "@queries/index";
import { getLS } from "@services/localStorageService";
import { Category, Login, ModalReconnect, Navbar } from "@components/index";

export const Home = () => {
  const [isAuth, setIsAuth] = useState(!!getLS("accessToken"));
  const { data: categories, error: errorCategories } =
    useQueryRetrieveCategories(isAuth);
  const { data: tasks, error: errorTasks } = useQueryRetrieveTasks(isAuth);

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
          {categories &&
            tasks &&
            categories.map((category, index) => (
              <Category
                key={index}
                color={category.color}
                name={category.name}
                tasks={tasks.filter((task) => task.category === category.id)}
              />
            ))}
        </div>
      </main>
    </>
  );
};
