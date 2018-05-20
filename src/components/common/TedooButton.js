import React from 'react';
import Button from "@material-ui/core/Button/Button";

const defaultStyle = {
    textTransform: 'none',
    borderRadius: 10,
};

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
        <Button style={Object.assign({}, defaultStyle, style, props.style)} onClick={props.onClick} variant={'raised'}>
            {props.text}
        </Button>
    );
};

export default TedooButton;