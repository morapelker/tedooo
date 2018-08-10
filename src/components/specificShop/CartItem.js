import React from 'react';
import {Badge} from "@material-ui/core/index";
import withStyles from "@material-ui/core/styles/withStyles";
import ImgWithLoader from "../common/ImgWithLoader";

const styles = {
    badge: {
        backgroundColor: 'red',
        position: 'absolute',
        left: 0,
        top: 0
    }
};

const CartItem = props => {
    const marginTop = props.index < 3 ? 'unset' : 5;
    return (
        <div style={{
            width: 90,
            height: 90,
            padding: 10,
            background: '#f2f2f2',
            borderRadius: 10,
            marginTop: marginTop
        }} onClick={() => {
            props.selector(props.item);
        }}>
            {props.item.count > 1 ? <Badge classes={{
            badge: props.classes.badge
        }}  color="secondary" badgeContent={props.item.count}>
                    <ImgWithLoader style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'contain'
                    }} src={props.item.img} alt={''}/>
        </Badge> :
                <ImgWithLoader style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain'
                }} src={props.item.img} alt={''}/>}
        </div>
    );
};

export default withStyles(styles)(CartItem);