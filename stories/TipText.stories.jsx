import React from 'react';

import TipText from './TipText';

export default {
  title: '组件/TipText',
  component: TipText,
  argTypes: {
    color: { control: 'color' },
  },
};

function Template({ text, color, bg }) {
  return (
    <TipText text={text} color={color} bg={bg}>
      TipText
    </TipText>
  );
}

export const info = Template.bind({});
info.args = {
  text: 'info',
};

export const success = Template.bind({});
success.args = {
  text: 'success',
  bg: '#1212ef24',
  color: '#1212ef',
};

export const warning = Template.bind({});
warning.args = {
  text: 'warning',
  bg: '#ffcc4024',
  color: '#ffcc40',
};

export const danger = Template.bind({});
danger.args = {
  text: 'danger',
  bg: '#ef121224',
  color: '#ef1212',
};
