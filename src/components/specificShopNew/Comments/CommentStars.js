import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const starIcon = 'star';
const emptyIcon = ['far', 'star'];

const CommentStars = () => {

    const [hoverStars, setHoverStars] = useState(3);
    const [stars, setStars] = useState(3);

    const starClicked = index => () => {
        setStars(index);
    };

    return (
        <div onMouseEnter={() => {
            setHoverStars(3);
        }} onMouseLeave={() => {
            setHoverStars(-1);
        }}>
            {[1, 1, 1, 1, 1].map((_, index) => {
                if (hoverStars !== -1) {
                    return <FontAwesomeIcon onMouseEnter={() => {
                        setHoverStars(index);
                    }} color={'#ffcc00'} key={index}
                                            onClick={starClicked(index)}
                                            style={{cursor: 'pointer'}}
                                            icon={hoverStars >= index ? starIcon : emptyIcon}
                                            size={'2x'}/>;
                } else {
                    return <FontAwesomeIcon onMouseEnter={() => {
                        setHoverStars(index);
                    }} color={'#ffcc00'} key={index}
                                            onClick={starClicked(index)}
                                            style={{cursor: 'pointer'}}
                                            icon={stars >= index ? starIcon : emptyIcon}
                                            size={'2x'}/>;
                }

            })}
        </div>
    );
};

export default CommentStars;