import React from 'react';
import Toast from './Toast';

export default {
  title: '组件/Toast',
  component: Toast,
};

function Template({ text, type }) {
  return <Toast text={text} type={type} />;
}

export const info = Template.bind({});
export const success = Template.bind({});
success.args = {
  text: 'This is a success message.',
  type: 'success',
};
export const loading = Template.bind({});
loading.args = {
  text: 'This is a loading message.',
  type: 'loading',
};
export const warning = Template.bind({});
warning.args = {
  text: 'This is a warning message.',
  type: 'warning',
};
export const danger = Template.bind({});
danger.args = {
  text: 'This is a danger message.',
  type: 'danger',
};