import { ComponentMeta, ComponentStory } from '@storybook/react';
import Select from 'components/common/select';

export default {
  title: 'Design System/Common/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});

Default.argTypes = {
  width: {
    name: 'Width',
    description: 'Select의 너비 스타일을 위한 프롭스',
  },
  align: {},
  options: {
    name: 'Options',
    description: 'Select의 전반적인 데이터를 위한 옵션셋',
  },
};

Default.args = {
  width: '100%',
  align: 'left',
  options: {
    defaultLabel: '최소',
    label: '연식',
    optionSet: [
      {
        option: '2023년',
        dataName: 'minYear',
        value: '2023',
      },
      {
        option: '2022년',
        dataName: 'minYear',
        value: '2022',
      },
      {
        option: '2021년',
        dataName: 'minYear',
        value: '2021',
      },
    ],
  },
};
