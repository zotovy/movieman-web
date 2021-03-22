import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primary: string,
            bg: string,
            lightBg: string,
            text: string,
            textSecondary: string,
            textDisabled: string,
            borderColor: string,
        };
        centerContent: string;
    }
}
