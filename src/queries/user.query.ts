import { App } from "antd";
import { AxiosError } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  setAccessToken,
  setLS,
  setRefreshToken,
} from "@services/localStorageService";
import axiosInstance from "./axios";
import { toastObject, messageObject } from "@utils/formatters";
import { ILoginRequest, ILoginResponse, IUser } from "@interfaces/index";

// =====
// Axios
// =====

// RETRIEVE
export const getUser = async (userId: number): Promise<IUser> => {
  const { data } = await axiosInstance.get(`/users/${userId}`);
  return data;
};
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

// RETRIEVE
export const useQueryUser = (userId: number) => {
  const { notification, message } = App.useApp();

  return useQuery(["user", userId], () => getUser(userId), {
    // Stale 5min
    staleTime: 60_000 * 5,
    onError: (error: AxiosError) => {
      if (error.response?.status === 404)
        message.error(messageObject("error", "Cet utilisateur n'existe pas."));
      else
        notification.error(
          toastObject(
            "error",
            "Impossible de récupérer les données",
            `Une erreur est survenue. Code : ${
              error.response ? error.response.status : error.message
            }`,
          ),
        );
    },
  });
};

// LOGIN
export const useMutationLogin = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();

  return useMutation(login, {
    onSuccess: (response) => {
      setAccessToken(response.access);
      setRefreshToken(response.refresh);
      try {
        const token = jwtDecode<any>(response.access);
        setLS("name", token.name);
        setLS("userId", token.user_id);

        notification.success(
          toastObject(
            "success",
            "Connexion réussie",
            `Bienvenue ${token.name} !`,
          ),
        );
        navigate(`/`);
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
  const navigate = useNavigate();
  const { notification } = App.useApp();

  return useMutation(reconnect, {
    onSuccess: (response) => {
      setAccessToken(response.access);
      setRefreshToken(response.refresh);
      try {
        const token = jwtDecode<any>(response.access);
        setLS("name", token.name);
        setLS("userId", token.user_id);
        notification.success(
          toastObject(
            "success",
            "Reconnexion réussie",
            `Heureux de vous revoir ${token.name} !`,
          ),
        );
        navigate(`/`);
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
    onError: (error) =>
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
  const navigate = useNavigate();
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
    onSuccess: (response) => {
      message.success(
        messageObject(
          "success",
          "Compte créé, vous pouvez vous connecter.",
          "useMutationRegister",
        ),
      );
      navigate("/login");
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
