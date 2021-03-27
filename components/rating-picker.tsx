import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    
    &:hover .star {
        background-image: url("/icons/star.png");
    }
    //
    .star {
        display: inline-block;
        padding-right: 5px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        background-image: url("/icons/outline-star.png");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        
        &.selected {
            background-image: url("/icons/star.png");
        }
        
        &:hover {
            background-image: url("/icons/star.png");
        }
        
        &:hover ~ .star {
            background-image: url("/icons/outline-star.png");
        }
    }
    
`;

export type Props = {
    onChange?: (i: number) => any;
}

const RatingPicker: React.FC<Props> = (props) => {
    const [rating, setRating] = useState(-1);

    return <Container className="rating-picker-component">
        {
            new Array(10).fill(0).map((_, i) => {
                return <div
                        onClick={() => {
                            if (props.onChange) props.onChange(i + 1);
                            setRating(i)
                        }}
                        className={`star ${rating >= i ? "selected" : ""}`} />
            })
        }
    </Container>
}

export default RatingPicker;
