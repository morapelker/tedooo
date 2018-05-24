import React from 'react';
import InfoColumn from "./InfoColumn";
import FavoriteManagement from "./FavoriteManagement";
import ImageColumn from "./ImageColumn";
import MediaQuery from 'react-responsive';

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
        display: 'flex',
        flexDirection: 'column',
        flex: 9,
    }, infoCol: {
        width: '25%'
    }, infoColSmall: {
        width: '100%'
    }
};

const SpecificShopData = (props) => {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <MediaQuery query="(min-width: 801px)">
                <div style={styles.root}>
                    <div style={styles.leftDiv}>
                        <ImageColumn style={styles.imgCol} shop={props.shop}/>
                        <FavoriteManagement style={styles.favs} addFavoritesAction={props.addFavoritesAction}
                                            shop={props.shop}/>
                    </div>
                    <InfoColumn style={styles.infoCol} token={props.token} actions={props.actions} admin={props.admin}
                                ownShop={props.ownShop} shop={props.shop}/>
                </div>
            </MediaQuery>
            <MediaQuery query="(max-width: 800px)">
                <div style={styles.rootSmall}>

                    <div style={styles.leftDivSmall}>
                        <ImageColumn style={styles.imgCol} shop={props.shop}/>
                        <FavoriteManagement style={styles.favs} addFavoritesAction={props.addFavoritesAction}
                                            shop={props.shop}/>
                    </div>
                    <InfoColumn style={styles.infoColSmall} token={props.token} actions={props.actions} admin={props.admin}
                                ownShop={props.ownShop} shop={props.shop}/>
                </div>
            </MediaQuery>
        </div>
    );
};

export default SpecificShopData;