import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Stars = ({className, stars, rating, size, children, color, iconClass}) => {
    const i = parseInt(stars, 10) || stars;
    const style = {
        textShadow: '0px 0px 3px #000',
        fontSize: size || '1em'
    };

    return (
        <div className={className}>
            {[1, 1, 1, 1, 1].map((_, index) => {
                if (i > index)
                    return <FontAwesomeIcon className={iconClass + ' full'} style={style}
                                            color={color || '#ffcc00'} key={index}
                                            icon="star"/>;
                else if (stars > index)
                    return <FontAwesomeIcon className={iconClass + ' half'} style={style}
                                            color={color || '#ffcc00'} key={index}
                                            icon="star-half-alt"/>;
                else
                    return <FontAwesomeIcon className={iconClass} color={'#c3c3c3'}
                                            key={index} style={style}
                                            icon={['far', 'star']}/>;
            })}
            {rating !== -2 && <span className={'rating'}>{rating || '---'}</span>}
            {children}
        </div>
    );
};
export default Stars;