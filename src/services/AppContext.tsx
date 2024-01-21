import { createContext } from "react";

export interface IAppContext {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const AppContext = createContext<IAppContext>({
  darkMode: false,
  setDarkMode: () => null,
});

export default AppContext;
