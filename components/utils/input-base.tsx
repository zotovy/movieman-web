import styled, { css } from "styled-components";

/**
 * This styles is shared for Input and Textarea components
 */

const styles = css`
    width: 100%;
    background: ${props => props.theme.colors.lightBg};
    border: 1px solid #27283C;
    border-radius: 10px;
    padding: 16px 20px;
    font-size: 18px;
    font-weight: normal;
    line-height: 22px;
    color: ${props => props.theme.colors.text};
    outline: none;
    box-sizing: border-box;
    transition: border 200ms ease;

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
