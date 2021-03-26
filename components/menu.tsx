import React, { useRef, useState } from "react";
import styled from "styled-components";
import Button from "@/components/button";
import Link from "next/link";

const Container = styled.menu`
    max-width: 1400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px auto 0;
    padding: 0 20px;

    a.company {
        height: 40px;
        flex: 0 0 auto;
        margin-right: 72px;
        display: flex;
        align-items: center;
        text-decoration: none;

        img {
            flex: 0 0 40px;
            height: 40px;
            margin-right: 15px;
        }

        h3 {
            color: white;
            font-weight: 500;
        }
    }

    label, .mobile-search {
        width: 100%;
        position: relative;

        input {
            height: 45px;
            background: none;
            width: 100%;
            border-radius: 7px;
            border: 1px solid var(--borderColor);
            outline: none;
            padding: 0 15px;
            color: var(--textSecondary);
            transition: 300ms border;
            font-size: 15px;

            &:focus {
                border: 1px solid ${({ theme }) => theme.colors.textSecondary};
            }

            &::placeholder {
                color: var(--textDisabled);
            }
        }

        img {
            cursor: pointer;
            display: block;
            top: 11px;
            right: 12px;
            width: 20px;
            height: 20px;
            position: absolute;
        }
    }

    .user-profile, .auth-buttons {
        cursor: pointer;
        flex: 0 0 auto;
        margin-left: 72px;
        display: flex;
        align-items: center;
        
        button.secondary {
            margin-right: 20px;
        }

        .profile-image {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin-right: 10px;
            background-size: cover;
            background-position: center;
        }

        span {
            font-size: 16px;
        }
    }

    .mobile-search, .mobile-search-trigger {
        display: none;
    }


    @media screen and (max-width: 960px) {
        padding: 0 20px;
        position: relative;

        label {
            display: none;
        }

        .user-profile {
            margin-left: 10px;
        }

        .mobile-search-trigger {
            display: block;
            margin-right: 10px;

            img {
                margin-top: 5px;
                width: 25px;
            }
        }

        .mobile-search {
            display: flex;
            align-items: center;
            justify-content: center;
            position: initial;

            input {
                opacity: 1;
                transition: 150ms opacity, 100ms background;
            }

            &.closed {
                pointer-events: none;

                input, img {
                    opacity: 0;
                }
            }

            input {
                z-index: 100;
                left: 0px;
                top: 0px;
                position: absolute;
                width: calc(100vw - 40px);
                background: var(--bg);
            }

            img {
                z-index: 100;
                width: 24px;
                height: 24px;
                top: 9px;
                right: 9px;
                position: absolute;
            }
        }

        span.name {
            display: none;
        }
    }
`;

type Props = {
    user: User | {
        name: string,
        profileImagePath?: string;
    } | null,
};

const MenuComponent: React.FC<Props> = (props) => {
    const [isMobileSearchCollapsed, setIsMobileSearchCollapsed] = useState(true);
    const mobileSearchInput = useRef<HTMLInputElement>(null);

    const imagePath = props.user?.profileImagePath ?? "/images/user-avatar.png";

    return <Container>
        <Link href="/" passHref>
            <a className="company">
                <img src="/images/logo.png" alt="logo" className="logo"/>
                <h3 className="movieman-title">Movieman</h3>
            </a>
        </Link>

        <label>
            <input type="text" placeholder="Search movie"/>
            <img src="/icons/search.png" alt=""/>
        </label>

        <div className={`mobile-search ${isMobileSearchCollapsed ? "closed" : ""}`}>
            <input
                    onBlur={() => setIsMobileSearchCollapsed(true)}
                    type="text"
                    ref={mobileSearchInput}
                    placeholder="Search movie"/>
            <img src="/icons/search.png" alt=""/>
        </div>

        <div className="mobile-search-trigger" onClick={() => {
            setIsMobileSearchCollapsed(!isMobileSearchCollapsed);
            mobileSearchInput?.current?.focus()
        }}>
            <img src="/icons/search.png" alt=""/>
        </div>

        {
            props.user
                    ? <Link href="/profile">
                        <div className="user-profile">
                            <div className="profile-image"
                                 style={{ backgroundImage: `url(${imagePath})` }}/>
                            <span className="name">{props.user.name}</span>
                        </div>
                    </Link>
                    : <div className="auth-buttons">
                        <Link href="/login">
                            <Button size="small" type="secondary">Login</Button>
                        </Link>
                        <Link href="/signup">
                            <Button size="small" type="primary">Signup</Button>
                        </Link>
                    </div>
        }


    </Container>
}

export default MenuComponent;
