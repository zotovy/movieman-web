import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../styles/globals.css";

import TitleComponent from "@/components/title";

export default {
    title: 'Components/Title',
    component: TitleComponent,
} as Meta;

const Template: Story<{ text: string }> = ({ text }) => <TitleComponent>{ text }</TitleComponent>;

export const Default = Template.bind({});
Default.args = {
    text: "Поиск по категориям"
};

