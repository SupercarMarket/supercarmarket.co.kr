import type { Dispatch } from 'feature';

export default function createAsyncDispatcher<ActionType extends string, Args>(
  type: ActionType,
  callback: (...rest: Args[]) => Promise<any>
) {
  const SUCCESS = `${type}_SUCCESS` as const;
  const ERROR = `${type}_ERROR` as const;

  return async function handler(
    dispatch: Dispatch<ActionType>,
    ...rest: Args[]
  ) {
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
