import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { AxiosError } from 'axios';

import axiosInstance from './axios';

import { ICategory, ITask } from '@interfaces/index';
import { messageObject, toastObject } from '@utils/formatters';

// =====
// Axios
// =====

// CREATE
export const createTask = async ({
  name,
  categoryId
}: {
  name: string;
  categoryId: string;
}): Promise<ITask> => {
  const { data } = await axiosInstance.post(
    '/tasks',
    { name },
    {
      params: { categoryId }
    }
  );
  return data;
};

export const createCategory = async ({
  name,
  color
}: {
  name: string;
  color: string;
}): Promise<ICategory> => {
  const { data } = await axiosInstance.post('/category', { name, color });
  return data;
};

// RETRIEVE
export const retrieveCategories = async (): Promise<ICategory[]> => {
  const { data } = await axiosInstance.get('/category');
  return data;
};

export const retrieveTasks = async (): Promise<ITask[]> => {
  const { data } = await axiosInstance.get('/tasks');
  return data;
};

// UPDATE
export const updateCategory = async ({
  payload,
  id
}: {
  payload: any;
  id: string;
}): Promise<ICategory> => {
  const { data } = await axiosInstance.patch(`/category/${id}`, payload);
  return data;
};

// DELETE
export const removeTask = async (id: string): Promise<any> => {
  await axiosInstance.delete(`/tasks/${id}`);
};

export const removeCategory = async (id: string): Promise<any> => {
  await axiosInstance.delete(`/category/${id}`);
};

// ==========
// ReactQuery
// ==========

// CREATE
export const useMutationCreateTask = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation(createTask, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Ajout...', 'useMutationCreateTask')
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['tasks']);

      message.success(
        messageObject(
          'success',
          response.name + ' ajouté',
          'useMutationCreateTask'
        )
      );
    },
    onError: (error: AxiosError) => {
      message.error(
        messageObject('error', error.message, 'useMutationCreateTask')
      );
    }
  });
};

export const useMutationCreateCategory = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation(createCategory, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Ajout...', 'useMutationCreateCategory')
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['categories']);

      message.success(
        messageObject(
          'success',
          'Catégorie ' + response.name + ' ajoutée',
          'useMutationCreateCategory'
        )
      );
    },
    onError: (error: AxiosError) => {
      message.error(
        messageObject('error', error.message, 'useMutationCreateCategory')
      );
    }
  });
};

// RETRIEVE
export const useQueryRetrieveCategories = (isAuth: boolean) => {
  const { notification } = App.useApp();

  return useQuery(['categories'], retrieveCategories, {
    enabled: isAuth,
    retry: false,
    onError: (error: AxiosError) =>
      notification.error(
        toastObject(
          'error',
          'Impossible de récupérer les catégories',
          error.message
        )
      )
  });
};

export const useQueryRetrieveTasks = (isAuth: boolean) => {
  const { notification } = App.useApp();

  return useQuery(['tasks'], retrieveTasks, {
    enabled: isAuth,
    retry: false,
    onError: (error: AxiosError) =>
      notification.error(
        toastObject(
          'error',
          'Impossible de récupérer les tâches',
          error.message
        )
      )
  });
};

// UPDATE
export const useMutationUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  return useMutation(updateCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
    },
    onError: () => {
      notification.error(
        toastObject(
          'error',
          'Modification échouée',
          "Vérifiez votre connexion internet ou contactez l'administrateur"
        )
      );
    }
  });
};

// DELETE
export const useMutationDeleteTask = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation(removeTask, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Suppression...', 'useMutationDeleteTask')
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      message.success(
        messageObject('success', 'Check !', 'useMutationDeleteTask')
      );
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 404)
        message.error(
          messageObject(
            'error',
            "Cette tâche n'existe plus !",
            'useMutationDeleteTask'
          )
        );
      else
        message.error(
          messageObject('error', error.message, 'useMutationDeleteTask')
        );
    }
  });
};

export const useMutationDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation(removeCategory, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Suppression...', 'useMutationDeleteCategory')
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      message.success(
        messageObject(
          'success',
          'Catégorie supprimée',
          'useMutationDeleteCategory'
        )
      );
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 404)
        message.error(
          messageObject(
            'error',
            "Cette catégorie n'existe plus !",
            'useMutationDeleteCategory'
          )
        );
      else
        message.error(
          messageObject('error', error.message, 'useMutationDeleteCategory')
        );
    }
  });
};
