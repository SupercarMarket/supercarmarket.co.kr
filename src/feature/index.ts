type Action = { type: string; error?: boolean; data?: unknown };
type Dispatch = (action: Action) => void;
type State<DataType> = { type: string; error?: boolean; data?: DataType };

export type { Action, Dispatch, State };
