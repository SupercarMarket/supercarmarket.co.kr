type Action<ActionType extends string> =
  | {
      type: ActionType;
<<<<<<< HEAD
      error?: null;
=======
      error?: boolean;
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
      data?: unknown;
    }
  | {
      type: `${ActionType}_SUCCESS`;
<<<<<<< HEAD
      error?: null;
=======
      error?: boolean;
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
      data?: unknown;
    }
  | {
      type: `${ActionType}_ERROR`;
<<<<<<< HEAD
      error?: Error;
=======
      error?: boolean;
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
      data?: unknown;
    };
type Dispatch<ActionType extends string> = (action: Action<ActionType>) => void;
type State<DataType> = { type: string; error?: boolean; data?: DataType };

export type { Action, Dispatch, State };
