import React from 'react';
import Button from "@material-ui/core/Button/Button";

const defaultStyle = {
        textTransform: 'capitalize',
        borderRadius: 10,
        fontFamily: 'Skia, sans-serif',
        fontWeight: 'lighter',
    }
;

const TedooButton = (props) => {
    const style = props.selected ? {
        backgroundColor: props.selectedBackground,
        color: props.selectedTextColor,

    } : {
        backgroundColor: props.clearBackground,
        color: props.deselectedTextColor,
        borderWidth: 1,
        borderStyle: 'solid',
        boxShadow: 'none',
    };


    return (
        <Button style={Object.assign({}, defaultStyle, style, props.style)} onClick={props.onClick} disabled={props.disabled}
                variant={'raised'}>
            {props.text}
        </Button>
    );
};

export default TedooButton;