import React, { useState } from "react";
import styled from "styled-components";
import InputBase from "@/components/utils/input-base";

export const Container = styled.div`
    position: relative;
    width: 100%;
    
    img {
        height: 20px;
        position: absolute;
        top: 18px;
        right: 20px;
        cursor: pointer;
    }
    
    .error-label {
        height: 0;
        overflow: hidden;
        transition: height 200ms ease;
        color: #EE4C31;
        font-size: 16px;
        font-weight: normal;
    }
    
    &.error {
        input {
            border: 1px solid #EE4C31;
            color: #EE4C31;
            
        }
        
        .error-label {
            margin-top: 5px;
            height: 20px;
        }
    }
`;

export type Props = React.ComponentPropsWithoutRef<'input'> & {
    needPasswordHiddenButton?: boolean;
    error?: string;
    ref?: any;
};

const Input: React.FC<Props> = (props) => {
    const needPasswordButton = props.needPasswordHiddenButton || typeof props.needPasswordHiddenButton == "undefined";

    if (props.type === "password" && needPasswordButton) {
        const [isPasswordHidden, setIsPasswordHidden] = useState(true);

        return <Container className={props.className + " input-component " + (props.error ? "error" : "")}>
            <InputBase as="input" {...props} type={isPasswordHidden ? "password" : ""} />
            {
                <img src={isPasswordHidden ? "/icons/closed-eye.png" : "/icons/open-eye.png"} alt="" onClick={() => setIsPasswordHidden(!isPasswordHidden)}/>
            }
            <div className="error-label">{ props.error }</div>
        </Container>
    }

    return <Container className={props.className + " input-component " + (props.error ? "error" : "")} >
        <InputBase as="input" {...props} />
        <div className="error-label">{ props.error }</div>
    </Container>
}

export default Input;
