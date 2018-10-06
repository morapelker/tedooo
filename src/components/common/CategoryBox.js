import React from 'react';
import ImgWithLoader from "./ImgWithLoader";

const CategoryBox = props => {
    return (
        <div style={{
            width: '30vmin',
            minWidth: 150,
            minHeight: 150,
            marginTop: 10,
            height: '30vmin',
            maxWidth: 300,
            maxHeight: 300,
            background: '#e6e6e6',
            cursor: 'pointer'
        }} onClick={() => {
            props.onClick(props.name);
        }}>
            <ImgWithLoader src={props.src} style={{width: '100%', height: '80%', objectFit: 'cover'}} />
            <span>{props.name}</span>
        </div>
    );
};

export default CategoryBox;