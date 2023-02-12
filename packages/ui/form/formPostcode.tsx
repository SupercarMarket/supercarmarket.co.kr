import * as React from 'react';
import type { Address } from 'react-daum-postcode';
import { useDaumPostcodePopup } from 'react-daum-postcode';

import Button from '../button';
import Container from '../container';
import Input from '../input';
import Wrapper from '../wrapper';
import * as style from './form.styled';

interface FormPostcodeProps {
  callback?: (data: [string, string, string]) => void;
}

const FormPostcode = ({ callback }: FormPostcodeProps) => {
  const open = useDaumPostcodePopup();
  const [address, setAddress] = React.useState('');
  const [detailAddress, setDetailAddress] = React.useState('');
  const [zipcode, setZipcode] = React.useState('');

  const handleComplete = (data: Address) => {
    setAddress(data.address);
    setZipcode(data.zonecode);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  React.useEffect(() => {
    if (address && detailAddress && zipcode && callback)
      callback([zipcode, address, detailAddress]);
  }, [address, detailAddress, zipcode]);

  return (
    <Container display="flex" flexDirection="column" gap="8px">
      <Wrapper css={style.postcodeWrapper}>
        <Input type="text" placeholder="우편번호" value={zipcode} readOnly />
        <Button type="button" variant="Line" onClick={handleClick}>
          우편번호 입력
        </Button>
      </Wrapper>
      <Input type="text" placeholder="주소" value={address} readOnly />
      <Input
        type="text"
        placeholder="상세 주소를 입력해주세요."
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
      />
    </Container>
  );
};

export default FormPostcode;
