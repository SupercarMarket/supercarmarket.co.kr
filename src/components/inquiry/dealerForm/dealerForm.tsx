import Button from 'components/common/button';
import { Form } from 'components/common/form';
import inquiry, { InquiryDealerFormState } from 'constants/inquiry';
import { FormProvider, useForm } from 'react-hook-form';
import { css } from 'styled-components';
import fetcher from 'utils/api/fetcher';

import InquiryFormItem from '../inquiryFormItem';

const DealerForm = () => {
  const methods = useForm<InquiryDealerFormState>();

  const handleRequire = (data: InquiryDealerFormState) => {
    const { addional: _, ...rest } = data;

    return new Promise((resolve, reject) => {
      Object.entries(rest).forEach(([key, value]) => {
        if (!value) {
          methods.setError(key as keyof InquiryDealerFormState, {
            message: '빈 칸을 입력해주세요.',
          });
          reject();
        }
        if (!value.length) {
          methods.setError(key as keyof InquiryDealerFormState, {
            message: '파일을 첨부 해주세요.',
          });
          reject();
        }
      });
      resolve(true);
    });
  };

  const onSubmit = methods.handleSubmit((d) =>
    handleRequire(d).then(async () => {
      const formData = new FormData();
      const {
        comAddress,
        addional,
        employeeCardBack,
        employeeCardFront,
        profileImage,
        regImage,
        ...rest
      } = d;
      const [zipcode, address, addressDetail] = comAddress;
      formData.append(
        'dealerRequestDto',
        new Blob(
          [
            JSON.stringify({
              ...rest,
              addional: addional || null,
              comAddress: {
                zipcode,
                detail: `${address} ${addressDetail}`,
              },
            }),
          ],
          { type: 'application/json' }
        )
      );
      employeeCardBack.forEach((file) =>
        formData.append('employeeCardBack', file)
      );
      employeeCardFront.forEach((file) =>
        formData.append('employeeCardFront', file)
      );
      profileImage.forEach((file) => formData.append('profileImage', file));
      regImage.forEach((file) => formData.append('regImage', file));

      const response = await fetcher('/server/supercar/v1/inquiry-dealer', {
        method: 'POST',
        body: formData,
      });

      console.log(response.status);
    })
  );
  return (
    <FormProvider {...methods}>
      <Form
        encType="multipart/form-data"
        onSubmit={onSubmit}
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 24px;
        `}
      >
        {inquiry.register.dealer.map((d) => (
          <InquiryFormItem
            key={d.htmlFor}
            callback={(d) => console.log(d)}
            {...d}
          />
        ))}
        <Button type="submit" width="104px">
          작성 완료
        </Button>
      </Form>
    </FormProvider>
  );
};

export default DealerForm;
