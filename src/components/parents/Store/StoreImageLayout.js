import React from 'react';
import StoreImage from "./StoreImage";

const items = [
    {
        left: 50,
        top: 100
    }, {
        right: 50,
        top: 100
    }, {
        right: 50,
        bottom: 100
    }, {
        left: 250,
        bottom: 100
    }, {
        left: '65%',
        top: 25
    }
];

const StoreImageLayout = props => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
        }}>
            {items.map((item, index) => (
                <StoreImage
                    ownShop={props.ownShop}
                    index={index}
                    deleteImage={props.deleteImage}
                    loading={props.loadingImage[index] || false}
                    key={index} onClick={()=>{
                    props.selector(index)
                }} edit={props.edit}
                            item={props.shop.items && props.shop.items[index]}
                            style={item} />
            ))}
        </div>
    );
};

export default StoreImageLayout;