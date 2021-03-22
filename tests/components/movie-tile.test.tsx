/// <reference types="@types/jest" />
import { render, screen } from "../test-utils";
import '@testing-library/jest-dom'

import MovieTile, { Props } from "@/components/movie-tile";
import { cleanup } from "@testing-library/react";


describe("Testing movie tile", () => {

    afterEach(cleanup);

    const props: Props = {
        genres: ["Драма"],
        id: 123,
        kpId: 123,
        poster: "https://planetakino.ua/res/get-poster/00000000000000000000000000002169/am_cartaz.regular_30cm_BREVE.jpg",
        rating: 7.7,
        title: "Маленькие женщины",
        year: "2019",
    };

    test("renders a movie tile", () => {
        render(<MovieTile {...props} />);

        const poster = screen.getByTestId("mt-poster");
        const title = screen.getByTestId("mt-title");
        const rating = screen.getByTestId("mt-rating");
        const year = screen.getByTestId("mt-year");
        const genre = screen.getByTestId("mt-genre");

        expect(poster).toHaveStyle(`background-image: url(${props.poster})`);
        expect(poster).toHaveStyle(`height: 230px`);
        expect(title).toHaveTextContent(props.title);
        expect(rating).toHaveTextContent(props.rating.toString());
        expect(rating).toHaveStyle(`color: #66D35A`);
        expect(year).toHaveTextContent(props.year);
        expect(genre).toHaveTextContent(props.genres[0]);
    });
});
