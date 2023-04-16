import { useMutation } from '@tanstack/react-query';
import { createBroadCastRoom, deleteBroadCastRoom } from './apis';

export const useCreateBroadCastRoom = (options = {}) => {
  return useMutation({
    mutationFn: (formData: FormData) => createBroadCastRoom(formData),
    ...options,
  });
};

export const useDeleteBroadCastRoom = (options = {}) => {
  return useMutation({
    mutationFn: (id: number) => deleteBroadCastRoom(id),
    ...options,
  });
};
