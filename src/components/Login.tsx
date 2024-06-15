import { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useFormik } from 'formik';
import { object, string } from 'yup';

import { IconLogo } from '@assets/index';
import { Button } from '@components/index';
import { useMutationLogin, useMutationRegister } from '@queries/index';
import { Link } from 'react-router-dom';

interface ILoginProps {
  setIsAuth: (value: boolean) => void;
}

export const Login = ({ setIsAuth }: ILoginProps) => {
  const [createAcc, setCreateAcc] = useState(false);
  const {
    mutate: login,
    isLoading: loadingLogin,
    isSuccess: loginSuccess
  } = useMutationLogin();
  const {
    mutate: register,
    isLoading: loadingRegister,
    isSuccess: registerSuccess
  } = useMutationRegister();

  const onSubmitHandler = async (values: {
    username: string;
    password: string;
  }) => {
    if (createAcc)
      register({ password: values.password, username: values.username });
    else login({ password: values.password, username: values.username });
  };

  const { errors, touched, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: onSubmitHandler,
    validationSchema: object({
      username: string().required('Compte requis'),
      password: string().required('Mot de passe requis')
    })
  });

  useEffect(() => {
    if (loginSuccess) setIsAuth(true);
  }, [loginSuccess]);
  useEffect(() => {
    if (registerSuccess) setCreateAcc(false);
  }, [registerSuccess]);

  return (
    <>
      <main
        data-testid="login"
        className="justify-centers flex h-[100dvh] flex-col items-center bg-zinc-100 px-2 dark:text-zinc-100">
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
              status={touched.username && errors.username ? 'error' : ''}
              {...getFieldProps('username')}
              data-testid="login-username"
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
              status={touched.password && errors.password ? 'error' : ''}
              {...getFieldProps('password')}
              data-testid="login-password"
            />
            {touched.password && errors.password && (
              <p className="font-bold text-red-500">{errors.password}</p>
            )}
          </div>

          <Button
            primary
            type="submit"
            disabled={!!errors.username || !!errors.password}
            loading={loadingLogin || loadingRegister}
            className="my-5 w-full disabled:bg-zinc-200"
            dataTestid="login-submit">
            {createAcc ? 'Créer mon compte' : 'Se connecter'}
          </Button>

          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <p className="text-zinc-400">
              {createAcc ? 'Déjà un compte ?' : 'Pas encore de compte ?'}
            </p>
            <p
              onClick={() => setCreateAcc(!createAcc)}
              className="cursor-pointer font-bold text-zinc-500 underline transition-colors hover:text-primary-500">
              {createAcc ? 'Se connecter' : 'Créer un compte'}
            </p>
          </div>
        </form>
        <div className="mt-auto p-5 text-zinc-400">
          <Link to="/privacyrules">Règles de confidentialités</Link>
          <p className="text-center text-zinc-300">Version {APP_VERSION}</p>
        </div>
      </main>
    </>
  );
};
