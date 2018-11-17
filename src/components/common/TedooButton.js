import React from 'react';
import Button from "@material-ui/core/Button/Button";

const defaultStyle = {
        textTransform: 'capitalize',
        borderRadius: 10,
        fontFamily: 'Skia, sans-serif',
        fontWeight: 'lighter',
    }
;

const TedooButton = ({selected, selectedBackground, selectedTextColor,
                         style, onClick, disabled, text, deselectedTextColor, clearBackground}) => {
    const s = selected ? {
        backgroundColor: selectedBackground,
        color: selectedTextColor,

    } : {
        backgroundColor: clearBackground,
        color: deselectedTextColor,
        borderWidth: 1,
        borderStyle: 'solid',
        boxShadow: 'none',
    };


    return (
        <Button style={Object.assign({}, defaultStyle, s, style)} onClick={onClick} disabled={disabled}
                variant={'raised'}>
            {text}
        </Button>
    );
};

export default TedooButton;