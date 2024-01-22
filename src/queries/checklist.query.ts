import { App } from "antd";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "./axios";
import { ICategory, ITask } from "@interfaces/index";
import { toastObject, messageObject } from "@utils/formatters";

// =====
// Axios
// =====

// CREATE
export const createTask = async ({
  name,
  categoryId,
}: {
  name: string;
  categoryId: string;
}) => {
  const { data } = await axiosInstance.post(
    "/tasks",
    { name },
    {
      params: { categoryId },
    },
  );
  return data;
};

// RETRIEVE
export const retrieveCategories = async (): Promise<ICategory[]> => {
  const { data } = await axiosInstance.get("/category");
  return data;
};

export const retrieveTasks = async (): Promise<ITask[]> => {
  const { data } = await axiosInstance.get("/tasks");
  return data;
};

export const retrieveOne = async (id: number): Promise<any> => {
  const { data } = await axiosInstance.get(`/endpoint/${id}`);
  return data;
};

// UPDATE
export const update = async ({ payload, id }: { payload: any; id: number }) => {
  const { data } = await axiosInstance.patch(`/endpoint/${id}`, payload);
  return data;
};

// DELETE
export const removeTask = async (id: string): Promise<any> => {
  await axiosInstance.delete(`/tasks/${id}`);
};

// ==========
// ReactQuery
// ==========

// CREATE
export const useMutationCreateTask = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(createTask, {
    onMutate: () => {
      message.open(
        messageObject("loading", "Ajout...", "useMutationCreateTask"),
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(["tasks"]);

      message.success(
        messageObject(
          "success",
          response.name + " ajouté",
          "useMutationCreateTask",
        ),
      );
    },
    onError: (error) => {
      message.error(
        messageObject(
          "error",
          "Une erreur est survenue",
          "useMutationCreateTask",
        ),
      );
      notification.error(
        toastObject(
          "error",
          "Impossible de créer la séance",
          "Vérifiez votre connexion internet ou contactez l'administrateur",
        ),
      );
    },
  });
};

// RETRIEVE
export const useQueryRetrieveCategories = (isAuth: boolean) => {
  const { notification } = App.useApp();

  return useQuery(["categories"], retrieveCategories, {
    enabled: isAuth,
    retry: false,
    onError: (error: AxiosError) =>
      notification.error(
        toastObject(
          "error",
          "Impossible de récupérer les catégories",
          error.message,
        ),
      ),
  });
};

export const useQueryRetrieveTasks = (isAuth: boolean) => {
  const { notification } = App.useApp();

  return useQuery(["tasks"], retrieveTasks, {
    enabled: isAuth,
    retry: false,
    onError: (error: AxiosError) =>
      notification.error(
        toastObject(
          "error",
          "Impossible de récupérer les tâches",
          error.message,
        ),
      ),
  });
};

export const useQueryRetrieveOne = (id: number) => {
  const { notification } = App.useApp();

  return useQuery(["someQuery", id], () => retrieveOne(id), {
    // Stale 5min
    staleTime: 60_000 * 5,
    onError: (error) =>
      notification.error(
        toastObject(
          "error",
          "Impossible de récupérer les données",
          "Vérifiez votre connexion internet ou contactez l'administrateur",
        ),
      ),
  });
};

// UPDATE
export const useMutationUpdate = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(update, {
    onMutate: () => {
      message.open(
        messageObject(
          "loading",
          "Modification en cours...",
          "useMutationUpdate",
        ),
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(["someQuery"]);
      message.success(
        messageObject("success", "Modification réussie", "useMutationUpdate"),
      );
    },
    onError: (error) => {
      message.error(
        messageObject("error", "Une erreur est survenue", "useMutationUpdate"),
      );
      notification.error(
        toastObject(
          "error",
          "Modification échouée",
          "Vérifiez votre connexion internet ou contactez l'administrateur",
        ),
      );
    },
  });
};

// DELETE
export const useMutationDeleteTask = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(removeTask, {
    onMutate: () => {
      message.open(
        messageObject("loading", "Suppression...", "useMutationDeleteTask"),
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(["tasks"]);
      message.success(
        messageObject("success", "Check !", "useMutationDeleteTask"),
      );
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 404)
        message.error(
          messageObject(
            "error",
            "Cette tâche n'existe plus !",
            "useMutationDeleteTask",
          ),
        );
      else
        message.error(
          messageObject(
            "error",
            "Une erreur est survenue",
            "useMutationDeleteTask",
          ),
        );
    },
  });
};
