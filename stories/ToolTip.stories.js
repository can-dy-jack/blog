import React from "react";
import ToolTip from "./ToolTip";
import Rbtn from "./Rbtn";

export default {
  title: "组件/ToolTip",
  component: ToolTip,
};

const Template = (args) => (
  <ToolTip text={args.text} type={args.type}>
    <Rbtn>ToolTip</Rbtn>
  </ToolTip>
);

export const bottom = Template.bind({});
bottom.args = {
  text: "提示内容",
};
export const top = Template.bind({});
top.args = {
  type: "top",
  text: "提示内容",
};
export const left = Template.bind({});
left.args = {
  type: "left",
  text: "提示内容",
};
export const right = Template.bind({});
right.args = {
  type: "right",
  text: "提示内容",
};
