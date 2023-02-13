import * as React from 'react';
import { css } from 'styled-components';

import { Container } from '../components';
import { Wrapper } from '../components/wrapper';
import type { FormSelectProps } from './formSelect';
import { FormSelect } from './formSelect';

interface FormRageProps {
  from: FormSelectProps['option'];
  to: FormSelectProps['option'];
  callback?: (value: [string, string]) => void;
}

const FormRange = (props: FormRageProps) => {
  const { from, to, callback } = props;
  const [fromValue, setFromValue] = React.useState('');
  const [toValue, setToValue] = React.useState('');

  React.useEffect(() => {
    if (callback) callback([fromValue, toValue]);
  }, [fromValue, toValue]);
  return (
    <Container display="flex" alignItems="center" gap="4px">
      <FormSelect option={from} callback={(from) => setFromValue(from)} />
      <Wrapper.Item
        css={css`
          width: 8px;
          height: 1px;
          background: ${({ theme }) => theme.color['greyScale-6']};
        `}
      />
      <FormSelect option={to} callback={(to) => setToValue(to)} />
    </Container>
  );
};

export { FormRange };
export type { FormRageProps };
