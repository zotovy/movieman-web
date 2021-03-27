import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../styles/globals.css";

import Rating from "../components/rating-picker";

export default {
    title: 'Components/Rating picker',
    component: Rating,
} as Meta;

type StoryProps = {

}

const TemplateDefault: Story<StoryProps> = (args) => <Rating/>

export const Default = TemplateDefault.bind({});
Default.args = {
};


