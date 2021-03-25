import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../styles/globals.css";

import Input from "../components/input";

export default {
    title: 'Components/Input',
    component: Input,
} as Meta;

type StoryProps = {
    placeholder: string;
    type: string;
    width: string;
}

const TemplateDefault: Story<StoryProps> = (args) => <div style={{ width: args.width }}>
    <Input {...args}/>
</div>;

export const Default = TemplateDefault.bind({});
Default.args = {
    placeholder: "Email",
    type: "email",
    width: "500px",
};


const TemplatePassword: Story<StoryProps> = (args) => <div style={{ width: args.width }}>
    <Input {...args}/>
</div>;

export const Password = TemplatePassword.bind({});
Password.args = {
    placeholder: "Password",
    type: "password",
    width: "500px",
};


