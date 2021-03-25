import React from "react";
import styled from "styled-components";

const Container = styled.button`
    padding: 14px 35px;
    border-radius: 10px;
    color: white;
    outline: none;
    border: none;
    font-size: 18px;
    line-height: 22px;
    transition: 200ms background-color;

    &:hover {
        cursor: pointer;
    }
    
    &.primary {
        background-color: ${ props => props.theme.colors.primary };
        
        &:hover {
            background-color: #546BD6;
        }
    }
    
    &.secondary {
        background-color: ${ props => props.theme.colors.lightBg };
        
        &:hover {
            background-color: #1B1F3E;
        }
    }
`;

export type Props = React.ComponentPropsWithoutRef<'button'> & {
    htmlType?: React.ComponentPropsWithoutRef<'button'>["type"];
    type?: "primary" | "secondary";
}

const Button: React.FC<Props> = (props) => {
    const type = props.type ?? "primary";
    return <Container {...props} className={type} type={props.htmlType} >
        {
            props.children
        }
    </Container>
}

export default Button;
