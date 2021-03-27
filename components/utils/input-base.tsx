import styled, { css } from "styled-components";

const styles = css`
    width: 100%;
    background: ${props => props.theme.colors.lightBg};
    border: 1px solid #27283C;
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 18px;
    line-height: 22px;
    outline: none;
    padding: 16px 20px;
    transition: border 200ms ease;
    color: ${props => props.theme.colors.text};
    font-weight: normal;

    &:focus {
        border: 1px solid #585b78;
    }

    &::placeholder {
        color: ${props => props.theme.colors.textSecondary}
    }

    &[type="password"] {
        &::placeholder {
            letter-spacing: initial;
        }

        letter-spacing: 7px;
    }
`

const InputBase = styled.select`${styles}`;
export default InputBase;
