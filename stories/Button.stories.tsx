import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../styles/globals.css";

import Button from "../components/button";

export default {
    title: 'Components/Button',
    component: Button,
} as Meta;

const TemplatePrimary: Story<{ text: string }> = (args) => <Button type="primary" >{ args.text }</Button>;

export const Primary = TemplatePrimary.bind({});
Primary.args = {
    text: "Смотреть на КинопоискHD"
};

const TemplateSecondary: Story<{ text: string }> = (args) => <Button type="secondary" >{ args.text }</Button>;

export const Secondary = TemplateSecondary.bind({});
Secondary.args = {
    text: "Смотреть на КинопоискHD"
};


