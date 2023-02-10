import { useMutation } from '@tanstack/react-query';

const fetcher = async (id: string) =>
  await fetch(`/api/market/like`, {
    method: 'POST',
    body: JSON.stringify(id),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

const useMarketLike = (id: string) => {
  return useMutation(['market', id], fetcher, {});
};

export default useMarketLike;
