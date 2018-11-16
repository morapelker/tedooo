import React from 'react';
import ImageColumn from "./ImageColumn";
import './SpecificShop.css';
import InfoColumn from "../specificShop/InfoColumn";

const SpecificShopData = (props) => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
        }}>
            <div className={'root'}>
                <ImageColumn shop={props.shop}/>
                <InfoColumn token={props.token} actions={props.actions}
                            admin={props.admin}
                            ownShop={props.ownShop} shop={props.shop} />
            </div>
        </div>
    );
};

export default SpecificShopData;