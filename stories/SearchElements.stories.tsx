import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../styles/globals.css";

import SearchElements from "@/components/search-elements";
import Input from "@/components/input";

export default {
    title: 'Components/Search Elements',
    component: SearchElements,
} as Meta;


type StoryProps = {
    isOpen: boolean;
    moviesCounter: number;
}

const movie: Movie = {
    genres: ["Драма"],
    poster: "https://planetakino.ua/res/get-poster/00000000000000000000000000002169/am_cartaz.regular_30cm_BREVE.jpg",
    title: "Маленькие женщины",
    year: "2019",
    rating: 7.7,
    id: 12,
    reviews: [],
    kpId: 1,
}

const Template: Story<StoryProps> = (props) => {
    return <div style={{ width: 500, position: "absolute" }}>
        <Input />
        <SearchElements
                inputHeight={56}
                movies={new Array(props.moviesCounter).fill(1).map(() => movie)}
                isOpen={props.isOpen}  />
    </div>
}

export const Default = Template.bind({});
Default.args = {
    isOpen: true,
    moviesCounter: 3,
};

