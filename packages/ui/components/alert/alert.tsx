import clsx from 'clsx';
import * as React from 'react';
import { deviceQuery } from '../../styles';
import theme from '../../styles/theme';

type Severity = 'success' | 'error' | 'info' | 'waring';

interface AlertProps {
  severity: Severity;
  title?: React.ReactNode;
  description?: React.ReactNode;
  width?: React.CSSProperties['width'];
}

const getSeverityColor = (severity: Severity) => {
  if (severity === 'error') return ['#FFF4F5', theme.color['system-1']];
  if (severity === 'waring') return ['#FEFCE8', '#A36813'];
  if (severity === 'info')
    return [theme.color['greyScale-3'], theme.color['greyScale-6']];
  return [theme.color['greyScale-3'], theme.color.primary];
};

const Alert = (props: AlertProps) => {
  const { severity, title, description, width = '100%' } = props;

  const [bgColor, contentColor] = getSeverityColor(severity);

  return (
    <div role="alert" className={clsx('alert')}>
      <div className={clsx('alert-icon')}>
        {severity === 'waring' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#FACC13"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#fff"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        )}
        {severity === 'info' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        )}
        {severity === 'error' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={theme.color['system-1']}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#FFF4F5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>
      <div className={clsx('alert-contents')}>
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </div>
      <style jsx>{`
        .alert {
          height: 100%;
          display: flex;
          align-items: ${description ? 'unset' : 'center'};
          justify-content: center;
          box-sizing: border-box;
          border-radius: 4px;
          padding: 12px;
          border: 1px solid ${severity === 'info' ? '#fff' : contentColor};
          font-size: ${theme.fontSize['body-20']};
          width: ${width};
          background-color: ${bgColor};
        }
        .alert-icon {
          height: 100%;
          display: flex;
          align-items: flex-start;
        }
        .alert-icon > svg {
          width: 20px;
          height: 20px;
        }
        .alert-contents {
          display: flex;
          flex-direction: column;
          margin-left: 12px;
        }
        .alert-contents > h2 {
          font-weight: bold;
          line-height: 120%;
          color: ${contentColor};
        }
        .alert-contents > p {
          font-weight: normal;
          line-height: 150%;
          color: ${contentColor};
        }
        @media screen and (${deviceQuery.mobile}) {
          .alert {
            font-size: ${theme.fontSize['body-14']};
          }
        }
      `}</style>
    </div>
  );
};

export { Alert };
export type { AlertProps };
