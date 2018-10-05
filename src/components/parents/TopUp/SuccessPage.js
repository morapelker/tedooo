import React from 'react';

const SuccessPage = props => {
    return (
        <div style={{color: 'red', width: 400, margin: 'auto', height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <h3>Payment Accepted</h3>
            <span style={{color: 'black'}}>Your order will be processed in the next 24 hours</span>
        </div>
    );
};

export default SuccessPage;