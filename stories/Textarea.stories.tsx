import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../styles/globals.css";

import Textarea from "../components/textarea";

export default {
    title: 'Components/Textarea',
    component: Textarea,
} as Meta;

type StoryProps = {
    placeholder: string;
    type: string;
    width: string;
}

const TemplateDefault: Story<StoryProps> = (args) => <div style={{ width: args.width }}>
    <Textarea {...args}/>
</div>;

export const Default = TemplateDefault.bind({});
Default.args = {
    placeholder: "Email",
    type: "email",
    width: "500px",
};


