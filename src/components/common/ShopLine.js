import React from 'react';
import {FloatingActionButton, RaisedButton} from "material-ui";
import RemoveIcon from 'material-ui/svg-icons/content/remove';

const shopSelected = (realFunc, id, name) => (
    () => {
        realFunc(id, name);
    }
);

const deleteHelper = (realFunc, id) => (
    () => {
        realFunc(id);
    }
);

const style = {
    container: {
        display: 'flex'
    },
    removeIcon: {
        marginRight: 10
    }
};

const ShopLine = (props) => {
    return (
        <div style={style.container}>
            {props.deleteMethod !== undefined ?
                <FloatingActionButton onClick={deleteHelper(props.deleteMethod, props.shop._id)}
                                      mini={true} secondary={true} style={style.removeIcon}>
                    <RemoveIcon />
                </FloatingActionButton> : null}
            <RaisedButton
                onClick={shopSelected(props.shopSelected, props.shop._id, (props.shop.favName || props.shop.name))}
                label={props.shop.favName || props.shop.name} fullWidth={true}/>
        </div>
    );
};

export default ShopLine;