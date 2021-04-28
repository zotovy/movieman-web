import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../styles/globals.css";

import MenuComponent, { Props } from "../components/menu";
import { user } from "./data";

export default {
    title: 'Components/Menu',
    component: MenuComponent,
} as Meta;

const Template: Story<Props> = (args) => {
    return <MenuComponent user={null} loading={false} {...args} />;
}

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    user,
    foundedMovies: [],
};

export const Loading = Template.bind({});
Loading.args = {
    user,
    loading: true,
    foundedMovies: [],
}

