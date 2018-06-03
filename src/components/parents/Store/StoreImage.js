import React from 'react';

const baseStyle = {
    borderRadius: 5,
    borderColor: 'blue',
    borderWidth: 2,
    borderStyle: 'solid',
};

const StoreImage = props => {
    return (
        <div onClick={props.onClick} style={Object.assign({}, props.edit && baseStyle, props.style, {
            position: 'absolute',
            height: 100,
            width: 100})}>
        </div>
    );
};

export default StoreImage;