import React from 'react';
import RefreshIndicator from "./RefreshIndicator";
import Img from 'react-image'

const ImgWithLoader = (props) => {
    return (
        <Img style={props.style}
             src={props.src}
             alt={props.alt || ''}
             decode={false}
             {...props.otherProps}
             loader={<div style={{...props.style, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                 <RefreshIndicator size={props.size || 20} color={props.color || 'black'} />
             </div>}/>
    );
};

export default ImgWithLoader;