import * as React from 'react';

type FormRadioValueType = {
  value: string;
  content?: string;
};

type FormRadioGroupProps = {
  name?: string;
  options?: FormRadioValueType[];
  children?: (props: {
    name?: string;
    options?: FormRadioValueType[];
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => React.ReactElement;
  callback?: (value: string) => void;
};

const FormRadioGroup = (
  props: FormRadioGroupProps,
  ref: React.Ref<HTMLFieldSetElement>
) => {
  const { name, options, children, callback, ...rest } = props;
  const [value, setValue] = React.useState('');

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  if (!children) throw new Error('need radio children');

  React.useEffect(() => {
    if (callback) callback(value);
  }, [value]);

  return (
    <fieldset ref={ref} id={name} {...rest}>
      {children({ name, options, handleChange })}
    </fieldset>
  );
};

export default React.forwardRef(FormRadioGroup);
