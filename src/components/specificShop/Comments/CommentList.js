import React from 'react';
import CommentItem from "./CommentItem";

const CommentList = ({items, secondary}) => {
    return (
        <div style={{marginTop: 10, display: 'flex', flexDirection: 'column', marginLeft: 40}}>
            {items.map((item, index) => <CommentItem secondary={secondary} item={item} key={index} />)}
            <div style={{height: 50}} />
        </div>
    );
};

export default CommentList;