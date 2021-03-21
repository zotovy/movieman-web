import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../styles/globals.css";

import MovieTile, { Props } from "../components/movie-tile";

export default {
    title: 'Components/Movie Tile',
    component: MovieTile,
} as Meta;

const Template: Story<Props> = (args) => <MovieTile {...args} />;

export const Default = Template.bind({});
Default.args = {
    genres: ["Драма"],
    poster: "https://planetakino.ua/res/get-poster/00000000000000000000000000002169/am_cartaz.regular_30cm_BREVE.jpg",
    title: "Маленькие женщины",
    year: "2019",
    rating: 7.7,
    id: 12,
};

