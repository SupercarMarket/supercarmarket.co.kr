import { useMutation } from '@tanstack/react-query';
import {
  deleteBackground,
  deleteRepresentative,
  uploadBackground,
  uploadRepresentative,
} from './apis';

export const useUploadBackground = (options = {}) => {
  return useMutation({
    mutationFn: (data: FormData) => uploadBackground(data),
    useErrorBoundary: false,
    ...options,
  });
};

export const useUploadRepresentative = (options = {}) => {
  return useMutation({
    mutationFn: (data: FormData) => uploadRepresentative(data),
    useErrorBoundary: false,
    ...options,
  });
};

export const useDeleteBackground = (options = {}) => {
  return useMutation({
    mutationFn: (url: string) => deleteBackground(url),
    useErrorBoundary: false,
    ...options,
  });
};

export const useDeleteRepresentative = (options = {}) => {
  return useMutation({
    mutationFn: (url: string) => deleteRepresentative(url),
    useErrorBoundary: false,
    ...options,
  });
};
