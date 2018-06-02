import React from 'react';
import StoreImage from "./StoreImage";

const StoreImageLayout = props => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            zIndex: 999,
            position: 'absolute',
            left: 0,
            top: 0,
        }}>
            <StoreImage edit={props.edit}
                        item={props.items && props.items[0]}
                        style={{
                left: 50,
                top: 100
            }} />
            <StoreImage
                edit={props.edit}
                item={props.items && props.items[1]}
                style={{
                right: 50,
                top: 100
            }} />
            <StoreImage edit={props.edit}
                        item={props.items && props.items[2]}
                        style={{
                right: 50,
                bottom: 100
            }} />
            <StoreImage edit={props.edit}
                        item={props.items && props.items[3]}
                        style={{
                left: 250,
                bottom: 100
            }} />
            <StoreImage edit={props.edit}
                        item={props.items && props.items[4]}
                        style={{
                left: '65%',
                top: 25
            }} />
        </div>
    );
};

export default StoreImageLayout;