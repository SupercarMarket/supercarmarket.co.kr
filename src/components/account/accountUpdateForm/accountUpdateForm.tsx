import Button from 'components/common/button';
import { Form, FormInput, FormLabel } from 'components/common/form';

import * as style from './accountUpdateForm.styled';

const AccountUpdateForm = () => {
  return (
    <Form css={style.form}>
      <FormLabel label="닉네임" name="nickname">
        <FormInput
          button
          buttonWidth="140px"
          buttonVariant="Primary-Line"
          buttonText="중복확인"
        />
      </FormLabel>
      <FormLabel label="소개" name="description">
        <FormInput />
      </FormLabel>
      <Button type="submit" variant="Primary" width="340px">
        수정하기
      </Button>
    </Form>
  );
};

export default AccountUpdateForm;
