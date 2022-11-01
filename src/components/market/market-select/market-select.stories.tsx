import { ComponentMeta, ComponentStory } from '@storybook/react';
import MarketSelect from 'components/market/market-select';

export default {
  title: 'Design System/Market/MarketSelect',
  component: MarketSelect,
} as ComponentMeta<typeof MarketSelect>;

const Template: ComponentStory<typeof MarketSelect> = (args) => (
  <MarketSelect {...args} />
);

export const Default = Template.bind({});

Default.argTypes = {
  firstLabel: {
    name: 'First Label',
    description: '첫 번째 Select의 Default Label',
  },
  secondLabel: {
    name: 'Second Label',
    description:
      '두 번째 Select의 Default Label(없으면 두 번째 Select는 렌더링되지 않음)',
  },
  optionSet: {
    name: 'Option Set',
    description: '각 Select에서 선택할 수 있는 Option 배열',
  },
  label: {
    name: 'Label',
    description:
      '어떤 Select인지 표기하고 Option의 value name을 지정 (형식: {subject: string, dataName: string} )',
  },
};

Default.args = {
  firstLabel: '최소',
  secondLabel: '최대',
  label: {
    subject: '연식',
    dataName: 'year',
  },
  optionSet: [
    {
      option: '2023년',
      value: '2023',
    },
    {
      option: '2022년',
      value: '2022',
    },
    {
      option: '2021년',
      value: '2021',
    },
  ],
};
