import Title from 'components/common/title';
import layout from 'components/layout';
import { MagazineBanner } from 'components/magazine';

const Magazine = () => {
  return (
    <div>
      <Title>따끈따끈한 최근 소식</Title>
      <MagazineBanner />
    </div>
  );
};

export default Magazine;

Magazine.Layout = layout;
