import type { Dispatch } from 'feature';

<<<<<<< HEAD
export default function createAsyncDispatcher<
  ActionType extends string,
  Args extends Array<any>
>(type: ActionType, callback: (...rest: Args) => Promise<any>) {
  const SUCCESS = `${type}_SUCCESS` as const;
  const ERROR = `${type}_ERROR` as const;

  return async function handler(dispatch: Dispatch<ActionType>, ...rest: Args) {
=======
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
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
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
<<<<<<< HEAD
        error: e as unknown as Error,
=======
        error: true,
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
      });
    }
  };
}
