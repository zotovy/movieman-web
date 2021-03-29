import React from "react";
import styled from "styled-components";
import FormatHelper from "@/helpers/format-helper";

const Container = styled.div`
    cursor: pointer;
    display: inline-block;
    width: 100%;
    background-color: ${ props => props.theme.colors.lightBg };
    border-radius: 15px;
    padding: 15px;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .user {
            display: flex;
            align-items: center;

            .user-avatar {
                margin-right: 20px;
                display: inline-block;
                width: 45px;
                height: 45px;
                border-radius: 10px;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
            }

            span.name {
                color: ${ props => props.theme.colors.text };
                font-weight: 500;
                font-size: 18px;
                line-height: 22px;
            }
        }

        .rating {
            display: flex;
            align-items: center;

            img {
                width: 28px;
                margin-right: 10px;
            }

            span.rating-value {
                font-weight: bold;
                font-size: 18px;
                line-height: 22px;
                color: ${ props => props.theme.colors.text };
            }
        }
    }

    p.content {
        margin-top: 15px;
        font-size: 18px;
        line-height: 22px;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 400;

        .more {
            color: ${ props => props.theme.colors.primary };
        }
    }

    .comment {
        display: flex;
        align-items: center;
        margin-top: 15px;

        img {
            margin-right: 10px;
        }

        span.comment-amount {
            font-weight: normal;
            font-size: 16px;
            line-height: 19px;
            color: ${ props => props.theme.colors.textDisabled };
        }
    }
`;

export type Props = {
    user: User | {
        profileImagePath?: string;
        name: string;
    },
    rating: number;
    content: string;
    comments: ReviewComment[];
}

const ReviewComponent: React.FC<Props> = (props) => {
    const image = `url(${ props.user.profileImagePath ?? "/images/user-avatar.png" })`;

    return <Container className="review-component">
        <div className="header">
            <div className="user">
                <div className="user-avatar" style={ { backgroundImage: image } }/>
                <span className="name">{ props.user.name }</span>
            </div>
            <div className="rating">
                <img src="/icons/star.png" alt="" className="star"/>
                <span className="rating-value">{ props.rating.toFixed(1) } / 10.0</span>
            </div>
        </div>

        <p className="content">
            {
                props.content.length > 116
                        ? <React.Fragment>
                            { props.content.substr(0, 105) + "..." }
                            <span className="more"> ещё</span>
                        </React.Fragment>
                        : props.content
            }
        </p>

        <div className="comment">
            <img src="/icons/comments.png" alt="" className="comment-icon"/>
            <span className="comment-amount">
                {
                    props.comments.length > 0
                            ? `${ props.comments.length } ${ FormatHelper.getNumEnding(props.comments.length, ["комментарий", "комментария", "комментариев"]) }`
                            : "Нет комментариев"
                }
            </span>
        </div>
    </Container>
}

export default ReviewComponent;
