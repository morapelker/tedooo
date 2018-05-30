import React from 'react';
import TedooButton from "./TedooButton";
import Button from "@material-ui/core/Button/Button";
import Img from 'react-image'
import RefreshIndicator from "./RefreshIndicator";

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

const capitalize = str => {
    return str.toUpperCase() || str;
};

const ShopLine = (props) => {
    const text = (props.shop.favName || props.shop.name) + (props.shop.shop_number ? ' (' + capitalize(props.shop.shop_number) + ')' : '');
    const avatarUrl = (props.shop.avatar ? props.shop.avatar : (
        props.shop.img_links && props.shop.img_links.length > 0 ? props.shop.img_links[0] : ''
    ));
    return (
        <div style={style.container}>
            {props.deleteMethod !== undefined ?
                <Button style={style.removeIcon}
                        onClick={deleteHelper(props.deleteMethod, props.shop._id)} variant={'fab'}
                        color={'inherit'}><img src={'assets/x.png'} alt={'delete'} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                }}/></Button>
                : null}
            {avatarUrl.length > 0 &&
            <Img style={{
                borderRadius: '50%',
                width: 30,
                height: 30,
                objectFit: 'cover',
                marginRight: 10,
                marginLeft: 10,
                alignSelf: 'center'
            }}
                src={avatarUrl}
                 loader={<RefreshIndicator style={{
                     margin: '0 auto',
                     alignSelf: 'center',
                     marginLeft: 10,
                     marginRight: 10,
                 }} size={30}/>}
            />
            }

            <TedooButton
                style={style.btnStyle}
                selected={true}
                selectedTextColor={'#3CBF95'}
                selectedBackground={'white'}
                onClick={props.shopSelected(props.parentData, props.shop)}
                text={text}/>
        </div>
    );
};

export default ShopLine;