import { authRequest } from 'http/core';

export const registerDealer = async (data: FormData) => {
  return authRequest('/inquiry-dealer', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

export const registerSale = async (data: FormData) => {
  return authRequest('/inquiry-product', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

export const registerPartnership = async (data: FormData) => {
  return authRequest('/partnership/inquiry', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

export const registerAdvertisement = async (data: FormData) => {
  return authRequest('/inquiry-advertisement', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

export const registerMisc = async (data: {
  title: string;
  contents: string;
}) => {
  return authRequest('/inquiry-etc', {
    method: 'POST',
    data,
  });
};
