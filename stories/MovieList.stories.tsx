import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../styles/globals.css";

import MovieHorizontalList , { Props } from "../components/movie-horizontal-list";

export default {
    title: 'Components/Movie Horizontal List',
    component: MovieHorizontalList,
} as Meta;

const Template: Story<Props> = (args) => <MovieHorizontalList {...args} />;

export const Default = Template.bind({});
Default.args = {

};

