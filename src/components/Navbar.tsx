import { useNavigate } from "react-router-dom";

import { IconOnOff } from "@assets/index";
import { DarkModeToggle } from "./DarkModeToggle";
import { clearLS } from "@services/localStorageService";

export const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    clearLS();
    navigate(0);
  };

  const items = [
    <IconOnOff onClick={handleLogout} className="shrink-0 text-red-600" />,
    <div className="font-title text-lg font-bold">Checklist</div>,
    <DarkModeToggle />,
  ];

  return (
    <nav className="fixed left-0 top-0 w-full bg-zinc-100 py-2 dark:bg-zinc-800 dark:text-zinc-100">
      <ul className="flex items-center justify-around">
        {items.map((item, index) => (
          <li key={index} className="cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};
