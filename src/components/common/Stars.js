import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Stars = ({className, stars, rating, size, children, color}) => {
    const i = parseInt(stars, 10) || stars;
    return (
        <div className={className}>
            {[1, 1, 1, 1, 1].map((_, index) => {
                if (i > index)
                    return <FontAwesomeIcon color={color || '#ffcc00'} key={index} icon="star" size={size}/>;
                else if (stars > index)
                    return <FontAwesomeIcon color={color || '#ffcc00'} key={index} icon="star-half-alt"
                                            size={size}/>;
                else
                    return <FontAwesomeIcon color={color || '#ffcc00'} key={index} icon={['far', 'star']}
                                            size={size}/>;
            })}
            {rating !== -2 && <span className={'rating'}>{rating || '---'}</span>}
            {children}
        </div>
    );
};
export default Stars;