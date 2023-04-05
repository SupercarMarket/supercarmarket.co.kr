import * as React from 'react';

export default function useBooleanState(
  defaultValue = false
): readonly [boolean, VoidFunction, VoidFunction, VoidFunction] {
  const [bool, setBool] = React.useState(defaultValue);

  const setTrue = React.useCallback(() => {
    setBool(true);
  }, []);

  const setFalse = React.useCallback(() => {
    setBool(false);
  }, []);

  const toggle = React.useCallback(() => {
    setBool((b) => !b);
  }, []);

  return [bool, setTrue, setFalse, toggle] as const;
}
