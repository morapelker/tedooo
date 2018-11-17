import React, {useState} from 'react';
import Stars from "../../common/Stars";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {bgColor} from "../../../api/apiConstants";
import Collapse from "@material-ui/core/Collapse/Collapse";
import CommentList from "./CommentList";
import ImgWithLoader from "../../common/ImgWithLoader";

const CommentItem = ({item, secondary}) => {
    const hasReplies = item.replies && item.replies.length > 0;
    const [expanded, setExpanded] = useState(false);
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: 20
        }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <ImgWithLoader style={{width: 40, height: 40, borderRadius: 20}} src={item.avatar}/>
                <h4 style={{margin: '0 0 0 10px'}}>{item.name}</h4>
            </div>
            {!secondary &&
            <Stars className={'comment_stars_container'} stars={item.star} rating={-2}>
                <span style={{marginLeft: 10, fontWeight: 'bold'}}>{item.title}</span>
            </Stars>
            }
            <span style={{marginTop: 5}}>{dateToString(item.creationDate)}</span>
            <div style={{
                display: 'flex', alignItems: 'center', marginTop: 20,
                cursor: hasReplies ? 'pointer' : 'unset'
            }} onClick={() => {
                setExpanded(!expanded);
            }}>
                <span style={{textAlign: 'left'}}>{item.text}</span>
                {hasReplies && <FontAwesomeIcon color={bgColor}
                                                style={{
                                                    marginLeft: 10
                                                }}
                                                icon={expanded ? 'chevron-up' : 'chevron-down'}/>}
            </div>
            {hasReplies &&
            <Collapse in={expanded}>
                <CommentList secondary={true} items={item.replies}/>
            </Collapse>
            }

        </div>
    );
};

const dateToString = date => {
    if (date)
        return new Date(date).toDateString();
    return undefined;
};

export default CommentItem;