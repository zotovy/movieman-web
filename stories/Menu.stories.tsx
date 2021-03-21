import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../styles/globals.css";

import MenuComponent from "../components/menu";


export default {
    title: 'Components/Menu',
    component: MenuComponent,
} as Meta;

const Template: Story<{}> = (args) => <MenuComponent {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    user: {},
};

