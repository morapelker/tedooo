import React from 'react';
import './shopline.css';
import ImgWithLoader from "./ImgWithLoader";
import Stars from "./Stars";

const capitalize = str => {
    return (str && str.toUpperCase()) || str;
};

export default ({shop, parentData, shopSelected, className}) => {
    const avatarUrl = (shop.avatar ? shop.avatar : (
        shop.img_links && shop.img_links.length > 0 ? shop.img_links[0] : ''
    ));
    const catClassName = shop.category && shop.category.length > 0 ? '' : ' empty';
    const shop_number = shop.favName || shop.name || capitalize(shop.shop_number);
    return (
        <div className={'shop_line_root' + (className ? ' ' + className : '')} onClick={shopSelected(parentData, shop)}>
            <span className={'shop_line_number'}>{shop_number}</span>
            <ImgWithLoader otherProps={{className: 'shop_line_image'}} src={avatarUrl} />
            <span className={'shop_line_cat' + catClassName}>{shop.category || 'p'}</span>
            <Stars className={'shop_line_stars'} stars={shop.avg || 0} rating={shop.totalReviews || 0} />
            <span className={'shop_line_desc'}>{shop.description}</span>
            <span className={'shop_line_city'}>{shop.city}</span>
        </div>
    );
};