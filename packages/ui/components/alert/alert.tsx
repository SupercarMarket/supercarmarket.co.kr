import clsx from 'clsx';
import * as React from 'react';
import theme from '../../styles/theme';

type Severity = 'success' | 'error' | 'info';

interface AlertProps {
  title?: React.ReactNode;
  severity: Severity;
  width?: React.CSSProperties['width'];
}

const getSeverityColor = (severity: Severity) => {
  if (severity === 'error') return ['#FFF4F5', theme.color['system-1']];
  if (severity === 'info')
    return [theme.color['greyScale-3'], theme.color['greyScale-6']];
  return [theme.color['greyScale-3'], theme.color.primary];
};

const Alert = (props: AlertProps) => {
  const { severity, title, width = '100%' } = props;

  const [bgColor, contentColor] = getSeverityColor(severity);

  return (
    <div className={clsx('alert')}>
      <h2>{title}</h2>
      <style jsx>{`
        .alert {
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          border-radius: 4px;
          padding: 12px 22px;
          border: 1px solid ${contentColor};
          font-size: 20px;
          width: ${width};
          color: ${contentColor};
          background-color: ${bgColor};
        }
      `}</style>
    </div>
  );
};

export { Alert };
export type { AlertProps };
