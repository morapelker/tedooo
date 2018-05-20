import React from 'react';
import './SpecificShop.css';
import InfoLabelContainer from "./InfoLabelContainer";
import QRCode from 'qrcode.react';
import TipView from "../common/TipView";

const typeFromShop = shop => {
    switch (shop.authorized) {
        case '2':
            return 'error';
        case '1':
            return 'warning';
        case '0':
            return 'success';
        default:
            return ''
    }
};

const textFromShop = shop => {
    switch (shop.authorized) {
        case '2':
            return shop.authorized_description;
        case '1':
            return 'Your shop is pending approval';
        case '0':
            return 'Your shop has been approved and is now visible to users';
        default:
            return ''
    }
};

const colorFromShop = shop => {
    switch (shop.authorized) {
        case '2':
            return 'red';
        case '1':
            return 'orange';
        case '0':
            return 'white';
        default:
            return ''
    }
};

const imageSourceFromShop = shop => {
    switch (shop.authorized) {
        case '2':
            return '/assets/infoIcon.png';
        case '1':
            return '/assets/infoIcon.png';
        case '0':
            return '/assets/check.png';
        default:
            return '';
    }
};

const InfoColumn = (props) => {
    return (
        <div className={'infoRoot'}>
            {props.ownShop &&
            <TipView style={{
                height: 36,
                width: 36,
                alignSelf: 'flex-end',
                alignItems: 'center',
                display: 'flex'
            }} text={textFromShop(props.shop)}
                     type={typeFromShop(props.shop)}
                     imageSource={imageSourceFromShop(props.shop)}
                     color={colorFromShop(props.shop)}
            />}

            <InfoLabelContainer img='/assets/infoIcon.png' labels={[
                props.shop.address,
                props.shop.market_name,
                'Shop Number: ' + props.shop.shop_number,
                'Category: ' + props.shop.category
            ]}/>

            <InfoLabelContainer img='/assets/phone.png'
                                labels={props.shop.contact_info.map(info => info.number)}/>

            <div className='infoBox'>
                <QRCode value={props.shop.qr_code} fgColor='#3CBF95' bgColor='#ffffff'/>
            </div>

        </div>
    );
};

export default InfoColumn;