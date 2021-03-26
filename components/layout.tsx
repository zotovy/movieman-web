import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Layout = styled.main`
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
    
    &.with-menu {
        margin-top: 15px;
        height: calc(100vh - 75px);
    }
`;

type Props = {
    withMenu?: boolean;
}

const Component: React.FC<Props> = (props) => {
    const withMenu = (props.withMenu ?? false) ? "with-menu" : "";

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <Layout className={withMenu}>
            { props.children }
        </Layout>
    </motion.div>
}

export default Component;
