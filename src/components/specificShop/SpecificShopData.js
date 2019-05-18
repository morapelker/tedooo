import React, {useState} from 'react';
import ImageColumn from "./ImageColumn";
import './SpecificShop.css';
import InfoColumn from "./InfoColumn";
import CommentSection from "./Comments/CommentSection";
import SimilarShops from "./SimilarShops";
import TipView from "../common/TipView";
import {LargeScreen, SmallScreen} from "../common/ScreenSizes";
import TripNavigator from "./TripNavigator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {bgColor} from "../../api/apiConstants";
import {Link} from "react-router-dom";
import SubmitButton from "../common/SubmitButton";
import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import ShopApi from "../../api/shopApi";
import {CopyToClipboard} from "react-copy-to-clipboard";

const textFromShop = shop => (shop.category || '') + (shop.description || '');

const typeFromShop = shop => {
    switch (shop.authorized) {
        case '2':
            return 'error';
        case '0':
            return 'warning';
        case '1':
            return 'success';
        default:
            return ''
    }
};

const textTipFromShop = shop => {
    switch (shop.authorized) {
        case '2':
            return shop.authorized_description;
        case '0':
            return 'Your shop is pending approval';
        case '1':
            return 'Your shop has been approved and is now visible to users';
        default:
            return ''
    }
};

const colorFromShop = shop => {
    switch (shop.authorized) {
        case '2':
            return 'red';
        case '0':
            return 'orange';
        case '1':
            return 'white';
        default:
            return ''
    }
};

const imageSourceFromShop = shop => {
    switch (shop.authorized) {
        case '2':
            return '/assets/infoIcon.png';
        case '0':
            return '/assets/infoIcon.png';
        case '1':
            return '/assets/check.png';
        default:
            return '';
    }
};

const SpecificShopData = (props) => {

    const [open, setOpen] = useState(false);
    const [approveText, setApproveText] = useState('');
    const [link, setLink] = useState(undefined);
    const [copyText, setCopy] = useState('Copy');

    const deny = () => {
        setOpen(false);
        props.actions.alterShop(props.shop._id, {
            authorized: '2',
            authorized_description: approveText
        }, props.token);
    };

    const approve = () => {
        setOpen(false);
        props.actions.alterShop(props.shop._id, {authorized: '1'}, props.token);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const createLink = () => {
        setLink(false);
        ShopApi.createLink(props.shop._id, props.token)
            .then(res => setLink('http://www.tedooo.com/claim/' + res._id + '/' + res.shopId))
            .catch(() => setLink(undefined));
    };

    const closeClicked = () => setLink(undefined);

    return (
        <div style={{
            width: '100%',
            overflowY: 'scroll',
            position: 'relative'
        }}>
            <SmallScreen>
                {props.ownShop &&
                <TipView className={'shop_tip_view'} direction={'right'} style={{
                    height: 36,
                    width: 36,
                    alignItems: 'center',
                    display: 'flex'
                }} text={textTipFromShop(props.shop)}
                         type={typeFromShop(props.shop)}
                         imageSource={imageSourceFromShop(props.shop)}
                         color={colorFromShop(props.shop)}
                />}
            </SmallScreen>
            <LargeScreen>
                {(props.ownShop || props.right || props.left) &&
                <div style={{position: 'relative', height: 50, marginTop: 10}}>
                    {props.ownShop &&
                    <div style={{
                        right: 20,
                        position: 'absolute',
                        display: 'flex'
                    }}>
                        <TipView className={'shop_tip_view'} direction={'left'} style={{
                            height: 36,
                            width: 36,
                            marginRight: 10,
                            alignItems: 'center',
                            display: 'flex'
                        }} text={textTipFromShop(props.shop)}
                                 type={typeFromShop(props.shop)}
                                 imageSource={imageSourceFromShop(props.shop)}
                                 color={colorFromShop(props.shop)}
                        />
                        <Link to={'/addshop/' + props.shop._id}>
                            <FontAwesomeIcon
                                color={bgColor}
                                style={{
                                    cursor: 'pointer',
                                    height: 40,
                                    padding: 5,
                                    width: 40,
                                }}
                                icon={'edit'}/>
                        </Link>
                        <div style={{flex: 1}}/>
                        {props.admin && <SubmitButton image={'authorize'} submit={() => {
                            setOpen(true);
                        }}/>}
                        {props.admin && <SubmitButton image={'link'} submit={createLink}/>}
                    </div>}
                    {(props.right || props.left) &&
                    <TripNavigator right={props.right} left={props.left}
                                   leftClicked={props.leftClicked}
                                   rightClicked={props.rightClicked}/>
                    }
                </div>}
            </LargeScreen>

            <Dialog
                open={open}
                aria-labelledby="form-dialog-title"
                onClose={closeDialog}
            >
                <DialogTitle id="form-dialog-title">Shop approval</DialogTitle>
                <DialogContent>
                    <Input onChange={e => setApproveText(e.target.value)} value={approveText}
                           placeholder={'Additional Text'}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={deny} color="secondary">
                        Deny
                    </Button>
                    <Button onClick={approve} color="primary">
                        Approve
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={link !== undefined}
                aria-labelledby="form-dialog-title"
                onClose={closeClicked}
            >
                <DialogTitle id="form-dialog-title">Change ownership link</DialogTitle>
                <DialogContent style={{display: 'flex'}}>
                    {link ? <Input value={link}/> : <CircularProgress style={{margin: 'auto'}}/>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeClicked} color="inherit">
                        Close
                    </Button>
                    <CopyToClipboard text={link}
                                     onCopy={() => setCopy('Copied')}>
                        <Button color="secondary">
                            {copyText}
                        </Button>
                    </CopyToClipboard>
                </DialogActions>
            </Dialog>

            <div className={'root'}>
                <SmallScreen>
                    {(props.ownShop || props.right || props.left) &&
                    <div style={{position: 'relative', height: 50, marginTop: 10}}>
                        {props.ownShop &&
                        <Link to={'/addshop/' + props.shop._id}>
                            <FontAwesomeIcon
                                color={bgColor}
                                style={{
                                    cursor: 'pointer',
                                    height: 40,
                                    padding: 5,
                                    width: 40,
                                    left: 20,
                                    position: 'absolute'
                                }}
                                icon={'edit'}/>
                        </Link>
                        }
                        {(props.right || props.left) &&
                        <TripNavigator right={props.right} left={props.left}
                                       leftClicked={props.leftClicked}
                                       rightClicked={props.rightClicked}/>
                        }
                        {props.admin && <SubmitButton style={{
                            right: 20,
                            position: 'absolute',
                            top: 0
                        }} image={'authorize'} submit={() => {
                            setOpen(true);
                        }}/>}
                    </div>}
                </SmallScreen>
                <ImageColumn shop={props.shop}/>
                <InfoColumn token={props.token} actions={props.actions}
                            admin={props.admin}
                            ownShop={props.ownShop} shop={props.shop}/>
            </div>
            <div className={'specific_shop_other_section'}>
                <CommentSection token={props.token} userId={props.userId} shop={props.shop}
                                history={props.history}/>
                <SimilarShops historyAction={props.addHistoryAction} text={textFromShop(props.shop)}
                              history={props.history} currentId={props.shop._id}/>
            </div>
        </div>
    );
};

export default SpecificShopData;