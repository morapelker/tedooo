import React from 'react';
import TedooButton from "./TedooButton";
import Button from "@material-ui/core/Button/Button";

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
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#3CBF95',
        color: 'white',
        boxShadow: 'none',
        height: 40,
        width: 40,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 5
    },
    btnStyle: {
        flexGrow: 1,
        minWidth: 0,
        height: 45,
        margin: 'auto'
    }
};

const ShopLine = (props) => {
    return (
        <div style={style.container}>
            {props.deleteMethod !== undefined ?
                <Button style={style.removeIcon} onClick={deleteHelper(props.deleteMethod, props.shop._id)} variant={'fab'}
                        color={'inherit'}><img src={'assets/x.png'} alt={'delete'} style={{width: '100%', height: '100%', objectFit: 'contain'}} /></Button>
                : null}
            <TedooButton
                style={style.btnStyle}
                selected={true}
                selectedTextColor={'#3CBF95'}
                selectedBackground={'white'}
                onClick={props.shopSelected(props.parentData, props.shop)}
                text={props.shop.favName || props.shop.name}/>
        </div>
    );
};

export default ShopLine;