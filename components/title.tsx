import React from "react";
import styled from "styled-components";

const Container = styled.h2`
    font-size: 24px;
    font-weight: 500;
    color: ${ props => props.theme.colors.text };
`;

const TitleComponent: React.FC = (props) => {
    return <Container data-testid="title">
        { props.children }
    </Container>
}

export default TitleComponent;
