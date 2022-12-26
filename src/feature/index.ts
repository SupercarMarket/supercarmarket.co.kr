type Action<ActionType extends string> =
  | {
      type: ActionType;
      error?: null;
      data?: unknown;
    }
  | {
      type: `${ActionType}_SUCCESS`;
      error?: null;
      data?: unknown;
    }
  | {
      type: `${ActionType}_ERROR`;
      error?: Error;
      data?: unknown;
    };
type Dispatch<ActionType extends string> = (action: Action<ActionType>) => void;
type State<DataType> = { type: string; error?: boolean; data?: DataType };

export type { Action, Dispatch, State };
