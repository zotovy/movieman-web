import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

const LoadingContainer = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column; 
    align-items: start;
    
    .poster {
        border-radius: 20px;
    }
    
    .title {
        margin-top: 10px;
    }

    .subtitle {
        margin-top: 7px;
    }
`;

export const LoadingMovieTile: React.FC<{ type: "default" | "tall" }> = ({ type }) => {
    if (type === "default") {
        return <LoadingContainer className="movie-component">
            <Skeleton width={410} height={230} className="poster"/>
            <Skeleton width={225} height={26} className="title" />
            <Skeleton width={100} height={17} className="subtitle" />
        </LoadingContainer>
    }

    return <LoadingContainer className="tall-movie-component">
        <Skeleton width={182} height={270} className="poster"/>
        <Skeleton width={133} height={19} className="title" />
        <Skeleton width={95} height={16} className="subtitle" />
    </LoadingContainer>
}
