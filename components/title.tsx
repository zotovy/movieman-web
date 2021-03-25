import React from "react";
import styled from "styled-components";
import { Property } from "csstype";

const Container = styled.h2`
    font-size: 24px;
    font-weight: 500;
    color: ${ props => props.theme.colors.text };
`;

export type Props = {
    weight?: Property.FontWeight;
}

const TitleComponent: React.FC<Props> = (props) => {
    const weight = props.weight ?? "initial";

    return <Container data-testid="title" style={{ fontWeight: weight }}>
        { props.children }
    </Container>
}

export default TitleComponent;
