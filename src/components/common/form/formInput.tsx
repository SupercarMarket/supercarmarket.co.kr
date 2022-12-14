import * as React from 'react';

import Button from '../button';
import Container from '../container';
import Input from '../input';
import Typography from '../typography';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  gap?: React.CSSProperties['gap'];
  button?: boolean;
  buttonWidth?: React.CSSProperties['width'];
  buttonText?: string;
  buttonVariant?: 'Primary-Line' | 'Line';
  buttonDisabled?: boolean;
  buttonCallback?: () => Promise<void>;
}

const FormInput = (props: FormInputProps, ref: React.Ref<HTMLInputElement>) => {
  const {
    button = false,
    buttonText,
    buttonVariant,
    buttonWidth,
    buttonDisabled,
    buttonCallback,
    gap = '20px',
    ...rest
  } = props;
  return (
    <Container display="flex" alignItems="center" gap={gap}>
      <Input ref={ref} {...rest} />
      {button && (
        <Button
          variant={buttonVariant}
          disabled={buttonDisabled}
          width={buttonWidth}
          onClick={buttonCallback}
        >
          <Typography
            as="span"
            fontSize="body-16"
            fontWeight="regular"
            lineHeight="150%"
            color={buttonVariant === 'Primary-Line' ? 'primary' : 'greyScale-4'}
            style={{
              width: buttonWidth,
              display: 'flex',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}
          >
            {buttonText}
          </Typography>
        </Button>
      )}
    </Container>
  );
};

export default React.forwardRef(FormInput);
