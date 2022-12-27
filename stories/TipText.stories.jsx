import React from "react";

import TipText from "./TipText";

export default {
    title: "组件/TipText",
    component: TipText,
    argTypes: {
        color: { control: 'color' }
    }
}

const Template = (args) => (
    <TipText text={args.text} color={args.color} bg={args.bg}>
      You can also define args at the global level; they will apply to every component's stories unless you overwrite them. 
    </TipText>
);

export const normal = Template.bind({})
normal.args = {
    text: "info"
}
