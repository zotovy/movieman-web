/// <reference types="@types/jest" />
import { render, screen } from "../test-utils";
import '@testing-library/jest-dom'

import TitleComponent from "@/components/title";
import { cleanup } from "@testing-library/react";


describe("Testing title", () => {

    afterEach(cleanup);

    const text = "HEEEELLLOOOO";

    test("renders tile", () => {
        render(<TitleComponent>{ text }</TitleComponent>);

        const title = screen.getByTestId("title");

        expect(title).toHaveTextContent(text);
        expect(title).toHaveStyle(`color: #ffffff`);
    });
});
