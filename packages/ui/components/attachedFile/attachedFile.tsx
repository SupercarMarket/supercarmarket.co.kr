import { createExternalLink, truncateOnWord } from '@supercarmarket/lib';
import { deviceQuery } from '../../styles';

export interface AttachedFileProps {
  files: {
    name: string;
    url: string;
  }[];
}

export const AttachedFile = (props: AttachedFileProps) => {
  const { files } = props;

  return (
    <ul className="attachedFile">
      {Array.from({ length: files.length }).map((_, index) => (
        <a
          href={createExternalLink(files[index].url)}
          target="_blank"
          rel="noopener noreferrer"
          className="attachedFile-link"
        >
          <li key={files[index].name} className="attachedFile-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 12 12"
              fill="#8E8E95"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99999 7.99984V9.99984H1.99999V7.99984H0.666656V9.99984C0.666656 10.7332 1.26666 11.3332 1.99999 11.3332H9.99999C10.7333 11.3332 11.3333 10.7332 11.3333 9.99984V7.99984H9.99999ZM9.33332 5.33317L8.39332 4.39317L6.66666 6.11317V0.666504H5.33332V6.11317L3.60666 4.39317L2.66666 5.33317L5.99999 8.6665L9.33332 5.33317Z"
                fill="#8E8E95"
              />
            </svg>
            <span>{truncateOnWord(files[index].name, 44)}</span>
          </li>
        </a>
      ))}
      <style jsx>{`
        ul {
          box-sizing: border-box;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 30px 40px;
          border: 1px solid #eaeaec;
          border-radius: 4px;
          gap: 8px;
        }
        li {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        span {
          font-family: inherit;
          font-weight: 500;
          font-size: 16px;
          line-height: 150%;
        }
        @media (${deviceQuery.mobile}) {
          ul {
            padding: 16px;
          }
          span {
            font-size: 12px;
          }
        }
      `}</style>
    </ul>
  );
};
