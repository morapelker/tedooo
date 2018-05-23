import React from 'react';
import ImageColumn from "./ImageColumn";
import InfoColumn from "./InfoColumn";
import FavoriteManagement from "./FavoriteManagement";

const styles = {
    root: {
        display: 'flex',
        margin: 'auto',
        height: '100%',
        marginTop: 20
    }, leftDiv: {
        width: '75%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    }
};

const SpecificShopData = (props) => {
    return (
        <div style={styles.root}>
            <div style={styles.leftDiv}>
                <ImageColumn shop={props.shop} />
                <FavoriteManagement addFavoritesAction={props.addFavoritesAction} shop={props.shop} />
            </div>
            <InfoColumn token={props.token} actions={props.actions} admin={props.admin} ownShop={props.ownShop} shop={props.shop} />
        </div>
    );
};

export default SpecificShopData;