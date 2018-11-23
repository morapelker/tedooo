import React from 'react';
import ImageColumn from "./ImageColumn";
import './SpecificShop.css';
import InfoColumn from "../specificShop/InfoColumn";
import CommentSection from "./Comments/CommentSection";

const SpecificShopData = (props) => {
    return (
        <div style={{
            width: '100%',
            overflowY: 'scroll',
        }}>
            <div className={'root'}>
                <ImageColumn shop={props.shop}/>
                <InfoColumn token={props.token} actions={props.actions}
                            admin={props.admin}
                            ownShop={props.ownShop} shop={props.shop} />
            </div>
            <CommentSection token={props.token} userId={props.userId} shop={props.shop} />
        </div>
    );
};

export default SpecificShopData;