import { useState } from "react";

import { getLS } from "@services/localStorageService";
import { Login, ModalReconnect, Navbar } from "@components/index";

export const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAuth, setIsAuth] = useState(!!getLS("access"));

  if (!isAuth) return <Login setIsAuth={setIsAuth} />;

  return (
    <>
      <ModalReconnect
        logout={() => setShowModal(false)}
        showReconnectModal={showModal}
      />
      <Navbar />
      <main className="mt-10 flex flex-col items-center px-2">
        <h1>Checklist</h1>
      </main>
    </>
  );
};
