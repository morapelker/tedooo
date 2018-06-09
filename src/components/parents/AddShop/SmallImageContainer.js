import React from 'react';
import './addshop.css'

const SmallImageContainer = props => {
    return (
        <div style={{
            display: 'flex',
        }}>
            {props.children}
        </div>
    );
};

export default SmallImageContainer;