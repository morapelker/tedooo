import React from 'react';
import ImageColumn from "./ImageColumn";
import './SpecificShop.css';
import InfoColumn from "./InfoColumn";
import CommentSection from "./Comments/CommentSection";
import SimilarShops from "./SimilarShops";

const textFromShop = shop => (shop.category || '') + (shop.description || '');

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
            <div style={{width: '100%', display: 'flex'}}>
                <CommentSection token={props.token} userId={props.userId} shop={props.shop} history={props.history} />
                <SimilarShops historyAction={props.addHistoryAction} text={textFromShop(props.shop)} history={props.history} currentId={props.shop._id} />
            </div>
        </div>
    );
};

export default SpecificShopData;