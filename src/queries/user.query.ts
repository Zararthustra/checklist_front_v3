import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "./axios";

import { ILoginRequest, ILoginResponse } from "@interfaces/index";
import {
  setAccessToken,
  setLS,
  setRefreshToken,
} from "@services/localStorageService";
import { messageObject, toastObject } from "@utils/formatters";

// =====
// Axios
// =====

// LOGIN
export const login = async (payload: ILoginRequest) => {
  const { data } = await axiosInstance.post<ILoginResponse>(`/token/`, payload);
  return data;
};
// RECONNECT
export const reconnect = async (refreshToken: string) => {
  const { data } = await axiosInstance.post<ILoginResponse>(`/token/refresh/`, {
    refresh: refreshToken,
  });
  return data;
};
// REGISTER
export const register = async (payload: ILoginRequest) => {
  const { data } = await axiosInstance.post(`/register`, payload);
  return data;
};

// ==========
// ReactQuery
// ==========

// LOGIN
export const useMutationLogin = () => {
  const { notification } = App.useApp();

  return useMutation(login, {
    onSuccess: (response) => {
      setAccessToken(response.access);
      setRefreshToken(response.refresh);
      try {
        const token = jwtDecode<any>(response.access);
        setLS("name", token.username);
        setLS("userId", token.user_id);

        notification.success(
          toastObject(
            "success",
            "Connexion réussie",
            `Bonjour ${token.username} !`,
          ),
        );
      } catch (error) {
        console.log("JWT Error:", error);
        notification.error(
          toastObject(
            "error",
            "Problème de connexion",
            `Une erreur est survenue, veuillez vous reconnecter`,
          ),
        );
      }
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401)
        notification.error(
          toastObject(
            "error",
            "Connexion impossible",
            "Nom de compte ou mot de passe incorrect.",
          ),
        );
      else
        notification.error(
          toastObject(
            "error",
            `Une erreur est survenue`,
            `Code : ${error.response ? error.response.status : error.message}`,
          ),
        );
    },
  });
};

// RECONNECT
export const useMutationReconnect = () => {
  const { notification } = App.useApp();

  return useMutation(reconnect, {
    onSuccess: (response) => {
      setAccessToken(response.access);
      setRefreshToken(response.refresh);
      try {
        const token = jwtDecode<any>(response.access);
        setLS("name", token.username);
        setLS("userId", token.user_id);
        notification.success(
          toastObject(
            "success",
            "Reconnexion réussie",
            `Heureux de vous revoir ${token.username} !`,
          ),
        );
      } catch (error) {
        console.log("JWT Error:", error);
        notification.error(
          toastObject(
            "error",
            "Problème de connexion",
            `Une erreur est survenue, veuillez vous reconnecter`,
          ),
        );
      }
    },
    onError: () =>
      notification.error(
        toastObject(
          "error",
          "Problème de connexion",
          `Une erreur est survenue, veuillez vous reconnecter`,
        ),
      ),
  });
};

// REGISTER
export const useMutationRegister = () => {
  const { message } = App.useApp();

  return useMutation(register, {
    onMutate: () => {
      message.open(
        messageObject(
          "loading",
          "Création de votre compte...",
          "useMutationRegister",
        ),
      );
    },
    onSuccess: () => {
      message.success(
        messageObject(
          "success",
          "Compte créé, vous pouvez vous connecter !",
          "useMutationRegister",
        ),
      );
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400)
        message.error(
          messageObject(
            "error",
            "Compte existant, veuillez choisir un autre nom de compte",
            "useMutationRegister",
          ),
        );
      else
        message.error(
          messageObject(
            "error",
            `Une erreur est survenue. Code : ${
              error.response ? error.response.status : error.message
            }`,
            "useMutationRegister",
          ),
        );
    },
  });
};
