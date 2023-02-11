import * as React from 'react';

type FormTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const FormTextArea = (
  props: FormTextAreaProps,
  ref: React.Ref<HTMLTextAreaElement>
) => {
  const { name, id, role, ...rest } = props;
  return (
    <>
      <textarea
        ref={ref}
        id={id}
        role={role}
        name={name}
        className="form-textarea"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        {...rest}
      />
      <style jsx>{`
        .form-textarea {
          width: 100%;
          height: 180px;
          resize: none;
          border: none;
          outline: none;
          font-weight: 500;
          font-size: 14px;
          line-height: 21px;
          box-sizing: border-box;
          border: 1px solid #c3c3c7;
          border-radius: 4px;
          padding: 16px;
        }
      `}</style>
    </>
  );
};

export default React.forwardRef(FormTextArea);
