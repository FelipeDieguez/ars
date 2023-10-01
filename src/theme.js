import { extendTheme } from "@chakra-ui/react";

const theme = {
    colors: {
        white: '#ffffff',
        gray: '#F9F9F9'
    },
    fonts: {
        title: 'Open Sans, sans-serif',
        body: 'Open Sans, sans-serif'
    },
    fontSizes: {
        sm: '10px',
        md: '15px',
        lg: '20px'
    }
}

export default extendTheme(theme)