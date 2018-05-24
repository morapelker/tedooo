import React from 'react';
import MediaQuery from "react-responsive";

const MediaTypeTest = () => {
    return (
        <div style={{
            width: '300px',
            height: '100%',
            backgroundColor: 'red',
        }}>
            <div style={{
                width: '100%',
                height: '100%',
            }}>
                <div style={{
                    backgroundColor: 'yellow',
                    height: '75%'
                }}/>
                <div style={{
                    backgroundColor: 'green',
                    height: '25%'
                }}/>
            </div>
        </div>
    );
};

export default MediaTypeTest;