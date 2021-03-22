/// <reference types="@types/jest" />
import { render, screen } from "../test-utils";
import '@testing-library/jest-dom'

import TallMovieTile, { Props } from "@/components/tall-movie-tile";
import { cleanup } from "@testing-library/react";


describe("Testing tall movie tile", () => {

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

    test("renders a tall movie tile", () => {
        render(<TallMovieTile {...props} />);

        const poster = screen.getByTestId("tmt-poster");
        const title = screen.getByTestId("tmt-title");
        const year = screen.getByTestId("tmt-year");
        const genre = screen.getByTestId("tmt-genre");

        expect(poster).toHaveStyle(`background-image: url(${props.poster})`);
        expect(poster).toHaveStyle(`height: 270px`);
        expect(poster).toHaveStyle(`width: 182px`);
        expect(title).toHaveTextContent(props.title);
        expect(year).toHaveTextContent(props.year);
        expect(genre).toHaveTextContent(props.genres[0]);
    });
});
