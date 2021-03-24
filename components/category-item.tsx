import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 28px;
    padding: 5px 10px;
    border-radius: 8px;
    font-size: 15px;
    transition: 250ms background-color ease;
    display: inline-block;
    
    &.selected {
        background-color: ${ props => props.theme.colors.primary };
        color: ${ props => props.theme.colors.text };
    }
    
    &.disabled {
        background-color: ${ props => props.theme.colors.lightBg };
        color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
        
        &:hover {
            background-color: #1B1F3E;
        }
    }
`;

export type Props = {
    onClick?: () => any;
    selected?: boolean;
}

const CategoryItem: React.FC<Props> = (props) => {
    const selected = props.selected ?? false;

    return <Container
            onClick={props.onClick}
            className={"category-item " + (selected ? "selected" : "disabled")}
            data-testid="category">
        { props.children }
    </Container>
}

export default CategoryItem;
