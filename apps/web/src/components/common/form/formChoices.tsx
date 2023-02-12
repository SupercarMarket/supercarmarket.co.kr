import * as React from 'react';

import Container from '../container';
import FormSelect, { FormSelectProps } from './formSelect';

interface FormChoicesProps {
  options: FormSelectProps['option'][];
  callback?: (values: { [key: string]: string }) => void;
}

const FormChoices = (props: FormChoicesProps) => {
  const { options, callback } = props;
  const [values, setValues] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    if (callback) callback(values);
  }, [values]);
  return (
    <Container display="flex" alignItems="center" gap="20px">
      {options.map((option) => (
        <FormSelect
          key={option.name}
          option={option}
          callback={(value) =>
            setValues((prev) => ({ ...prev, [option.name]: value }))
          }
        />
      ))}
    </Container>
  );
};

export default FormChoices;
