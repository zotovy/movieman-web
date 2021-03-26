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
    
    &.small {
        font-size: 16px;
        padding: 10px 25px;
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

export type Props = Omit<React.ComponentPropsWithoutRef<'button'>, "type"> & {
    htmlType?: React.ComponentPropsWithoutRef<'button'>["type"];
    type?: "primary" | "secondary";
    size?: "small" | "default-size"
}

const Button: React.FC<Props> = (props) => {
    const type = props.type ?? "primary";
    const size = props.size ?? "";

    return <Container {...props} className={`${size} ${type}`} type={props.htmlType} >
        {
            props.children
        }
    </Container>
}

export default Button;
