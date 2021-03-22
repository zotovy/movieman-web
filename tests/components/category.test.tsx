/// <reference types="@types/jest" />
import { render,  screen } from "../test-utils";
import '@testing-library/jest-dom'

import CategoryComponent from "@/components/category-item";
import { cleanup, fireEvent } from "@testing-library/react";
import theme from "@/utils/theme";


describe("Testing Category Component", () => {

    afterEach(cleanup);

    const text = "HEEEELLLOOOO";

    test("renders correct on disabled", () => {
        let isChanged = false;

        const onClick = () => isChanged = true;

        const { rerender } = render(<CategoryComponent onClick={onClick}>{ text }</CategoryComponent>);

        const category = screen.getByTestId("category");

        // Before selection
        expect(category).toHaveTextContent(text);
        expect(category).toHaveStyle(`color: rgba(255, 255, 255, 0.8)`);
        expect(category).toHaveStyle(`background-color: ${theme.colors.lightBg}`)

        // Clicking
        fireEvent.click(category);
        rerender(<CategoryComponent selected={isChanged} onClick={onClick}>{ text }</CategoryComponent>);

        // After selection
        expect(isChanged).toBe(true);
        expect(category).toHaveStyle(`color: #ffffff`);
        expect(category).toHaveStyle(`background-color: ${theme.colors.primary}`);
    });
});
