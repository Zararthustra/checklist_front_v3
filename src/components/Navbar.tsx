import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { IconLogo, IconOnOff } from "@assets/index";
import { DarkModeToggle } from "./DarkModeToggle";
import { ModalReconnect } from "@components/index";
import { clearLS, getLS } from "@services/localStorageService";

export const Navbar = () => {
  const navigate = useNavigate();
  const now = Math.floor(Date.now() / 1000);
  const dummyToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const accessToken = jwtDecode<any>(
    !!getLS("accessToken") ? getLS("accessToken") : dummyToken,
  ).exp;
  const showReconnectModal = accessToken < now;
  const handleLogout = () => {
    clearLS();
    navigate(0);
  };

  const items = [
    <IconLogo width={50} height={50} />,
    <DarkModeToggle />,
    <IconOnOff
      width={24}
      height={24}
      onClick={handleLogout}
      className="ml-5 shrink-0 text-red-600"
    />,
  ];

  return (
    <>
      <ModalReconnect showReconnectModal={showReconnectModal} />

      <nav className="fixed left-0 top-0 w-full bg-zinc-100 px-5">
        <ul className="flex items-center justify-start">
          {items.map((item, index) => (
            <li
              key={index}
              className={"cursor-pointer" + (index === 1 ? " ml-auto" : "")}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
