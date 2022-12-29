import { FormProvider, useForm } from 'react-hook-form';

const ResultPasswordForm = () => {
  const methods = useForm();

  const onSubmit = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <h1></h1>
    </FormProvider>
  );
};

export default ResultPasswordForm;
