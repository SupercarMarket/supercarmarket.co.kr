import type { Action } from 'feature';

const loadingState = {
  loading: true,
  data: null,
  error: false,
};

const success = <DataType>(data: DataType) => ({
  loading: false,
  data,
  error: false,
});

const error = () => ({
  loading: false,
  data: null,
  error: true,
});

function createAsyncHandler<ActionType extends string, State>(
  type: ActionType,
  key: string
) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  return function handler(state: State, action: Action<ActionType>) {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loadingState,
        };
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data),
        };
      case ERROR:
        return {
          ...state,
          [key]: error(),
        };
      default:
        return state;
    }
  };
}

export { createAsyncHandler };
