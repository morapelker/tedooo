import React from 'react';
import InfoColumn from "./InfoColumn";
import FavoriteManagement from "./FavoriteManagement";
import ImageColumn from "./ImageColumn";
import MediaQuery from 'react-responsive';
import StoreImageLayout from "../parents/Store/StoreImageLayout";
import CartControl from "./CartControl";

const styles = {
    root: {
        display: 'flex',
        margin: 'auto',
        height: '100%',
        marginTop: 20,
        width: '100%'
    }, rootSmall: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        height: '100%',
        marginTop: 20,
        width: '100%'
    }, leftDiv: {
        width: '75%',
        display: 'flex',
        marginBottom: 15,
        flexDirection: 'column',
    }, leftDivSmall: {
        width: '100%',
        height: '100%',
        display: 'flex',
        marginBottom: 15,
        flexDirection: 'column',
    }, favs: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto',
        flexDirection: 'column',
        width: '80%',
        flex: 1,
        minHeight: 75
    }, imgCol: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 9,
        zIndex: 10
    }, infoCol: {
        width: '25%',
        zIndex: 10
    }, infoColSmall: {
        width: '100%',
        zIndex: 10
    }
};

const SpecificShopData = (props) => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
        }}>
            <StoreImageLayout
                deleteImage={props.deleteImage}
                loadingImage={props.loadingImage}
                ownShop={props.ownShop}
                selector={props.placeImageSelector} edit={props.edit} shop={props.shop}/>

            <MediaQuery query="(min-width: 520px)">
                <div style={styles.root}>
                    <div style={styles.leftDiv}>
                        <ImageColumn style={styles.imgCol} shop={props.shop}/>
                        <FavoriteManagement style={styles.favs}
                                            addFavoritesAction={props.addFavoritesAction}
                                            shop={props.shop}/>
                    </div>
                    <InfoColumn style={styles.infoCol} token={props.token} actions={props.actions}
                                admin={props.admin}
                                ownShop={props.ownShop} shop={props.shop}/>
                </div>
            </MediaQuery>
            <MediaQuery query="(max-width: 519px)">
                <div style={styles.rootSmall}>

                    <div style={styles.leftDivSmall}>
                        <ImageColumn style={styles.imgCol} shop={props.shop}/>
                        <FavoriteManagement style={styles.favs}
                                            addFavoritesAction={props.addFavoritesAction}
                                            shop={props.shop}/>
                    </div>
                    <InfoColumn style={styles.infoColSmall} token={props.token}
                                actions={props.actions} admin={props.admin}
                                ownShop={props.ownShop} shop={props.shop}/>
                </div>
            </MediaQuery>
            {props.ownShop && props.transactions && props.transactions.length > 0 &&
            <CartControl getMore={1} selector={props.editSelector}
                         transactions={props.transactions}/>
            }
        </div>
    );
};

export default SpecificShopData;