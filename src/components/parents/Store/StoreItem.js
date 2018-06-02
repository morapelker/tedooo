import React from 'react';
import StoreDescription from "./StoreDescription";
import StorePrice from "./StorePrice";

const StoreItem = props => {
    return (
        <div style={{
            width: props.size,
            marginTop: 40,
            position: 'relative'
        }}>
            <div style={{
                width: props.size,
                height: props.size,
                borderRadius: 15,
                backgroundColor: props.item.color || 'white',
                padding: 50
            }}>
                <img style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    opacity: props.opacity || 1
                }} src={props.item.avatar} alt={''}/>

            </div>
            <StorePrice />
            <StoreDescription label={props.item.label}/>
        </div>
    );
};

export default StoreItem;