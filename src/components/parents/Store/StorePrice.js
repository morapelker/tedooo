import React from 'react';

const StorePrice = props => {
    return (
        <div style={{
            width: '100%',
            height: 40,
            position: 'absolute',
            left: 0,
            top: 5
        }}>
            <div style={{
                margin: '0 auto',
                width: '70%',
                height: 40,
                display: 'flex',
                backgroundColor: 'rgba(255,255,255,0.4)',
                borderRadius: 20,
            }}>
                <img src={'/assets/priceTag.png'} alt={''} style={{
                    width: 30,
                    height: 30,
                    marginLeft: 5,
                    marginTop: 5,
                    padding: 5,
                    objectFit: 'contains'
                }} />
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: 40,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span>For sale 30$</span>
                </div>
            </div>
        </div>
    );
};

export default StorePrice;