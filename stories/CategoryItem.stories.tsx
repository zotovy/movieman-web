import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../styles/globals.css";

import CategoryItem, { Props } from "@/components/category-item";

export default {
    title: 'Components/Category Item',
    component: CategoryItem,
    decorators: [

    ]
} as Meta;

const Template: Story<Props & { text: string }> = (args) => <CategoryItem {...args}>{args.text}</CategoryItem>;

export const Default = Template.bind({});
Default.args = {
    selected: true,
    text: "Фантастика"
};

