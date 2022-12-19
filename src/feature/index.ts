type Action<ActionType extends string> =
  | {
      type: ActionType;
      error?: boolean;
      data?: unknown;
    }
  | {
      type: `${ActionType}_SUCCESS`;
      error?: boolean;
      data?: unknown;
    }
  | {
      type: `${ActionType}_ERROR`;
      error?: boolean;
      data?: unknown;
    };
type Dispatch<ActionType extends string> = (action: Action<ActionType>) => void;
type State<DataType> = { type: string; error?: boolean; data?: DataType };

export type { Action, Dispatch, State };
