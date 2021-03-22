import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../styles/globals.css";

import MovieTile, { Props as MovieTileProps } from "../components/movie-tile";
import TallMovieTile, { Props as TallMovieTileProps } from "../components/tall-movie-tile";

export default {
    title: 'Components/Movie Tile',
    component: MovieTile,
} as Meta;

const TemplateDefault: Story<MovieTileProps> = (args) => <MovieTile {...args} />;

export const Default = TemplateDefault.bind({});
Default.args = {
    genres: ["Драма"],
    poster: "https://planetakino.ua/res/get-poster/00000000000000000000000000002169/am_cartaz.regular_30cm_BREVE.jpg",
    title: "Маленькие женщины",
    year: "2019",
    rating: 7.7,
    id: 12,
};

const TemplateTall: Story<TallMovieTileProps> = (args) => <TallMovieTile {...args} />
export const Tall = TemplateTall.bind({});
Tall.args = {
    genres: ["Драма"],
    poster: "https://www.kino-teatr.ru/movie/poster/131208/96737.jpg",
    title: "Маленькие женщины",
    year: "2019",
    rating: 7.7,
    id: 12,
};

