import { useState } from "react";
import { Outlet } from "react-router-dom";

import AppContext from "@services/AppContext";
import { getLS } from "./localStorageService";

const AppWrapper = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    getLS("darkmode") === "true" ? true : false,
  );

  return (
    <AppContext.Provider value={{ darkMode, setDarkMode }}>
      <Outlet />
    </AppContext.Provider>
  );
};

export default AppWrapper;
