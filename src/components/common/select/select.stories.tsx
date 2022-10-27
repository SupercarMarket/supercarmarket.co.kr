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
    defaultValue: '127',
  },
  defaultLabel: {
    name: 'default label',
    description: 'Select에서 최초로 보여지는 문자열',
  },
  label: {
    name: 'label',
    description: 'Select Option의 Value Name (label.dataName)',
  },
  select: {
    name: 'select',
    description: 'changeSelect로부터 변경된 값을 반영하는 state',
  },
  changeSelect: {
    name: 'changeSelect',
    description:
      '선택한 Option으로 변경해줄 로직 Props (option: {option: string, value: string}) => void;',
  },
  optionSet: {
    name: 'optionSet',
    description:
      'Select Option 배열 Props (형식: [{option: string, value: string}] )',
  },
};

Default.args = {
  width: '127',
  defaultLabel: '최소',
  label: { dataName: 'year' },
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
