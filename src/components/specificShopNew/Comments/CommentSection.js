import React, {useEffect, useState} from 'react';
import RefreshIndicator from "../../common/RefreshIndicator";
import ShopApi from "../../../api/shopApi";
import CommentList from "./CommentList";
import Stars from "../../common/Stars";
import './comments.css';

const CommentSection = ({shop, userId}) => {

    const [reviews, setReviews] = useState(undefined);
    const [total, setTotal] = useState(0);
    const [avg, setAvg] = useState(0);

    useEffect(() => {
        const randId = Math.random() * 10;
        ShopApi.getReviewsForShop(shop._id, userId, 0, randId).then(res => {
            if (res && res.reqId === randId) {
                setAvg(res.avg || 0);
                setTotal(res.total);
                setReviews(Array.isArray(res.data) ? res.data : []);
            }
        });
    }, [shop]);

    return (
        <div className={'comment_root'}>
            {Array.isArray(reviews) ?
                <div>
                    <h4>{total} customer review{total > 1 && 's'}</h4>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Stars rating={-2} stars={avg} size={'2x'} />
                        <span style={{marginLeft: 10, color: 'blue'}}>{avg} out of 5 stars</span>
                    </div>
                    <CommentList items={reviews} />
                </div>
                : <RefreshIndicator/>}
        </div>
    );
};

export default CommentSection;