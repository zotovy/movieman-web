import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    
    .left-side {
        width: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .avatar {
            flex: 0 0 50px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            margin-bottom: 10px;
        }
        
        .stick {
            width: 2px;
            height: 100%;
            background-color: ${ props => props.theme.colors.borderColor };
        }
    }
    
    .right-side {
        margin-left: 15px;
        
        p.name {
            margin: 14px 0;
            font-size: 18px;
            color: ${ props => props.theme.colors.text };
        }
        
        p.content {
            font-size: 18px;
            padding-top: 10px;
            line-height: 30px;
            letter-spacing: 0.04em;
            font-weight: normal;
        }
    }
`;

export type Props = {
    user: User | {
        profileImagePath?: string;
        name: string;
    },
    content: string;
}

const Comment: React.FC<Props> = (props) => {
    const profileImage = props.user.profileImagePath ?? "/images/user-avatar.png";

    return <Container className="comment-component">
        <div className="left-side">
            <div className="avatar" style={{ backgroundImage: `url(${profileImage})` }} />
            <div className="stick"/>
        </div>
        <div className="right-side">
            <p className="name">{ props.user.name }</p>
            <p className="content">{ props.content }</p>
        </div>
    </Container>
}

export default Comment;
