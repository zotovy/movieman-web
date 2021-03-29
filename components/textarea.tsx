import React from "react";
import InputBase from "@/components/utils/input-base";
import { Container } from "@/components/input";

export type Props = React.ComponentPropsWithoutRef<'textarea'> & {
    error?: string;
};

const Textarea: React.FC<Props> = (props) => {
    return <Container className={props.className + " text-area-component " + (props.error ? "error" : "")} >
        <InputBase as="textarea" {...props}  />
        <div className="error-label">{ props.error }</div>
    </Container>
}

export default Textarea;
