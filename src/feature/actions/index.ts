import type { Dispatch } from 'feature';

export default function createAsyncDispatcher<Args>(
  type: string,
  callback: (...rest: Args[]) => Promise<any>
) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  return async function handler(dispatch: Dispatch, ...rest: Args[]) {
    dispatch({ type });
    try {
      const data = await callback(...rest);
      dispatch({
        type: SUCCESS,
        data,
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        error: true,
      });
    }
  };
}
