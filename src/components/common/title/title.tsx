import Typography from '../typography';

interface TitleProps {
  children?: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <Typography
      fontSize="header-24"
      fontWeight="bold"
      color="greyScale-6"
      lineHeight="120%"
      style={{
        width: '100%',
        textAlign: 'start',
        marginBottom: '20px',
      }}
    >
      {children}
    </Typography>
  );
};

export default Title;
