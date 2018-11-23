import React from 'react';
import ImgWithLoader from "./ImgWithLoader";

const CategoryBox = props => {
    return (
        <div className={'category_item'} onClick={() => {
            props.onClick(props.name);
        }}>
            <ImgWithLoader src={props.src} style={{width: '100%', height: '80%', objectFit: 'cover'}} />
            <span>{props.name}</span>
        </div>
    );
};

export default CategoryBox;