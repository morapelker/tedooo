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
        flexGrow: 3,
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
                <FavoriteManagement addFavoritesAction={props.addFavoritesAction} name={props.shop.name} shop={props.shop} />
            </div>
            <InfoColumn ownShop={props.ownShop} shop={props.shop} />
        </div>
    );
};

export default SpecificShopData;