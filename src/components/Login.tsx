import { Input } from "antd";
import { useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";

import { IconLogo } from "@assets/index";
import { Button } from "@components/index";

interface ILoginProps {
  setIsAuth: (value: boolean) => void;
}

export const Login = ({ setIsAuth }: ILoginProps) => {
  const [createAcc, setCreateAcc] = useState(false);
  // const { mutate, isLoading, isError } = useMutationLogin();

  const onSubmitHandler = async (values: {
    username: string;
    password: string;
  }) => {
    console.log("Logged", values);
    // if (createAcc)
    // mutate({ password: values.password, username: values.username });
  };

  const { errors, touched, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: onSubmitHandler,
    validationSchema: object({
      username: string().required("Compte requis"),
      password: string().required("Mot de passe requis"),
    }),
  });

  return (
    <>
      <main className="justify-centers flex h-[100dvh] flex-col items-center bg-zinc-100 px-2 dark:text-zinc-100">
        <IconLogo width={300} height={300} className="mt-10" />
        <form className="max-w-[15rem]" onSubmit={handleSubmit}>
          {/* Compte */}
          <div className="mb-1">
            <label className="font-bold" htmlFor="username">
              Compte
            </label>
            <Input
              allowClear
              id="username"
              autoComplete="username"
              status={touched.username && errors.username ? "error" : ""}
              {...getFieldProps("username")}
            />
            {touched.username && errors.username && (
              <p className="font-bold text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="">
            <label className="font-bold" htmlFor="password">
              Mot de passe
            </label>
            <Input.Password
              allowClear
              id="password"
              autoComplete="current-password"
              status={touched.password && errors.password ? "error" : ""}
              {...getFieldProps("password")}
            />
            {touched.password && errors.password && (
              <p className="font-bold text-red-500">{errors.password}</p>
            )}
          </div>

          <Button
            primary
            type="submit"
            disabled={!!errors.username || !!errors.password}
            // loading={isLoading}
            className="my-5 w-full"
          >
            {createAcc ? "Créer mon compte" : "Se connecter"}
          </Button>

          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <p className="text-zinc-400">
              {createAcc ? "Déjà un compte ?" : "Pas encore de compte ?"}
            </p>
            <p
              onClick={() => setCreateAcc(!createAcc)}
              className="cursor-pointer font-bold text-zinc-500 underline transition-colors hover:text-primary-500"
            >
              {createAcc ? "Se connecter" : "Créer un compte"}
            </p>
          </div>
        </form>
        <p className="mt-auto self-end p-5 text-zinc-300">
          Version {APP_VERSION}
        </p>
      </main>
    </>
  );
};
