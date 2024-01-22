import { Input, message } from "antd";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { flat, gradients } from "@data/colors";
import { messageObject } from "@utils/formatters";
import { IconLogo, IconOnOff } from "@assets/index";
import { clearLS, getLS } from "@services/localStorageService";
import { ModalReconnect, DarkModeToggle } from "@components/index";
import { useMutationCreateCategory } from "@queries/checklist.query";

export const Navbar = () => {
  const navigate = useNavigate();
  const now = Math.floor(Date.now() / 1000);
  const dummyToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const accessToken = jwtDecode<any>(
    !!getLS("accessToken") ? getLS("accessToken") : dummyToken,
  ).exp;
  const showReconnectModal = accessToken < now;
  const colorsArray: string[] = [...flat, ...gradients];
  const [inputValue, setInputValue] = useState<string>("");
  const {
    mutate: createCategory,
    isLoading,
    isSuccess,
  } = useMutationCreateCategory();

  const handleLogout = () => {
    clearLS();
    navigate(0);
  };

  const handleAddCategory = (e: any) => {
    e.preventDefault();
    if (!!!inputValue) {
      message.config({
        top: 40,
      });
      message.success(messageObject("warning", "Il n'y a rien à ajouter !"));
      return;
    }
    createCategory({
      name: inputValue,
      color: colorsArray[Math.floor(Math.random() * colorsArray.length)],
    });
  };

  useEffect(() => {
    if (isSuccess) setInputValue("");
  }, [isSuccess]);

  const items = [
    <IconLogo width={50} height={50} />,
    <form className="mx-5" onSubmit={handleAddCategory}>
      <Input
        allowClear
        style={{
          borderRadius: "7px 0 7px 0",
        }}
        disabled={isLoading}
        id="category"
        placeholder="Nouvelle catégorie"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
    </form>,
    <div className="flex">
      <DarkModeToggle />
      <IconOnOff
        width={24}
        height={24}
        onClick={handleLogout}
        className="ml-5 shrink-0 text-red-600"
      />
    </div>,
  ];

  return (
    <>
      <ModalReconnect showReconnectModal={showReconnectModal} />

      <nav className="fixed left-0 top-0 z-20 w-full bg-zinc-100 px-5">
        <ul className="flex items-center justify-between">
          {items.map((item, index) => (
            <li key={index} className={"cursor-pointer"}>
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
