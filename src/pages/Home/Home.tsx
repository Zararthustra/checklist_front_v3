import { useState } from "react";

import { Login, Navbar } from "@components/index";
import { getLS } from "@services/localStorageService";

export const Home = () => {
  const [isAuth, setIsAuth] = useState(!!getLS("accessToken"));

  if (!isAuth) return <Login setIsAuth={setIsAuth} />;

  return (
    <>
      <Navbar />
      <main className="mt-[50px] flex flex-col items-center px-2 dark:text-zinc-100">
        <h1>Checklist</h1>
      </main>
    </>
  );
};
