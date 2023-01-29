import React from 'react';

import Rbtn from './Rbtn';

export default {
  title: '组件/Rbtn',
  component: Rbtn,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      description: '按钮是否处于禁用状态',
    },
    dark: {
      control: {
        type: 'boolean',
      },
      description: '黑暗背景按钮',
    },
    onClick: {
      control: {
        type: 'function',
      },
      description: '按钮事件',
    },
  },
};

function Template({ ...args }) {
  return (
    <Rbtn disabled={args.disabled} dark={args.dark} onClick={args.onClick}>
      {args.text ? args.text : '默认按钮'}
    </Rbtn>
  );
}

export const normal = Template.bind({});
export const dark_normal = Template.bind({});
dark_normal.args = {
  dark: true,
};
