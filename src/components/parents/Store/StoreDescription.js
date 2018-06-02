import React from 'react';

const StoreDescription = props => {
    return (
        <div style={{
            height: 60,
            padding: 15,
            paddingTop: 5
        }}>
            <label style={{
                color: 'white',
                textAlign: 'left'
            }}>{props.label}</label>

        </div>
    );
};

export default StoreDescription;