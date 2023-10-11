import { extendTheme } from "@chakra-ui/react";

const theme = {
    colors: {
        primary:'blue',
        second: 'red',
        white: '#ffffff',
        gray: '#F9F9F9',
        border: '#ffffff',
        selected: '#d9d9d9'
    },
    fonts: {
        title: 'Open Sans, sans-serif',
        body: 'Open Sans, sans-serif'
    },
    fontSizes: {
        sm: '10px',
        md: '15px',
        lg: '20px'
    },
    borderWidths: {
        none: '0px',
        sm: '1px',
        md: '2px',
        lg: '5px'
    }
}

export default extendTheme(theme)