import { useContext } from "react";

import { IconDark, IconLight } from "@assets/index";
import { setLS } from "@services/localStorageService";
import AppContext, { IAppContext } from "@services/AppContext";

export const DarkModeToggle = () => {
  const appContext = useContext<IAppContext>(AppContext);
  const root = window.document.documentElement;

  // On mounting
  if (appContext?.darkMode) {
    root.classList.add("dark");
  }

  const toggleDarkMode = () => {
    if (appContext?.darkMode) {
      root.classList.remove("dark");
      setLS("darkmode", "false");
      appContext?.setDarkMode(false);
    } else {
      root.classList.add("dark");
      setLS("darkmode", "true");
      appContext?.setDarkMode(true);
    }
  };

  if (appContext?.darkMode)
    return <IconLight className="cursor-pointer" onClick={toggleDarkMode} />;
  return (
    <IconDark
      className="cursor-pointer text-gray-800"
      onClick={toggleDarkMode}
    />
  );
};
