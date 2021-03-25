import styled from "styled-components";

export default styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    
    p.subtitle {
        margin-top: 20px;
        margin-bottom: 50px;
        font-weight: normal;
        font-size: 18px;
        line-height: 22px;
    }
    
    .input-component {
        margin-bottom: 20px;
    }
    
    form, button {
        width: 100%;
    }
`;
