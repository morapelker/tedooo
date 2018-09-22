import React, {Component} from 'react';
import './SpecificShop.css';
import InfoLabelContainer from "./InfoLabelContainer";
import QRCode from 'qrcode.react';
import TipView from "../common/TipView";
import SubmitButton from "../common/SubmitButton";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core/index";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom/umd/react-router-dom";

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

const textFromShop = shop => {
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

class InfoColumn extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {open: false, text: ''};
    }

    closeWindow = () => {
        this.setState({open: false});
    };

    deny = () => {
        this.setState({open: false});
        this.props.actions.alterShop(this.props.shop._id, {
            authorized: '2',
            authorized_description: this.state.text
        }, this.props.token);
    };

    accept = () => {
        this.setState({open: false});
        this.props.actions.alterShop(this.props.shop._id, {authorized: '1'}, this.props.token);
    };

    txtChanged = (e) => {
        this.setState({text: e.target.value});
    };

    render() {
        return (
            <div className={'infoRoot'} style={this.props.style}>
                <div style={{
                    display: 'flex',
                    alignSelf: 'flex-end',
                    alignItems: 'flex-end'
                }}>
                    {this.props.ownShop &&
                    <TipView style={{
                        height: 36,
                        width: 36,
                        alignItems: 'center',
                        display: 'flex',
                        position: 'fixed',
                        right: 30,
                        top: 30,
                    }} text={textFromShop(this.props.shop)}
                             type={typeFromShop(this.props.shop)}
                             imageSource={imageSourceFromShop(this.props.shop)}
                             color={colorFromShop(this.props.shop)}
                    />}
                    {this.props.ownShop &&
                    <Link style={{
                        zIndex: 10
                    }} to={'/addshop/' + this.props.match.params.id}>
                        <img src="/assets/pencil.png" alt={''} style={{
                            width: 40,
                            height: 40,
                            objectFit: 'contain',
                            marginRight: 10,
                        }}/>
                    </Link>}
                    {this.props.admin && <SubmitButton image={'authorize'} submit={() => {
                        this.setState({open: true});
                    }}/>}

                    <Dialog
                        open={this.state.open}
                        onClose={this.closeFavoritesWindow}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Shop approval</DialogTitle>
                        <DialogContent>
                            <Input onChange={this.txtChanged} value={this.state.text}
                                   placeholder={'Additional Text'}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeWindow} color="inherit">
                                Cancel
                            </Button>
                            <Button onClick={this.deny} color="secondary">
                                Deny
                            </Button>
                            <Button onClick={this.accept} color="primary">
                                Approve
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div>
                    <InfoLabelContainer img='/assets/infoIcon.png' labels={[
                        this.props.shop.address,
                        this.props.shop.market_name,
                        'Shop Number: ' + this.props.shop.shop_number,
                        'Category: ' + this.props.shop.category
                    ]}/>

                    {this.props.shop.contact_info && <InfoLabelContainer img='/assets/phone.png'
                                                                         labels={this.props.shop.contact_info.map(info => info.number)}/>}

                    {this.props.shop.qr_code
                    && this.props.shop.qr_code !== 'www.tedooo.com' && this.props.shop.qr_code.length !== 0
                    && <div className='infoBox' style={{marginTop: 15, marginBottom: 15}}>
                        <QRCode value={this.props.shop.qr_code} fgColor='#3CBF95'
                                bgColor='#ffffff'/>
                    </div>}


                    <label style={{
                        width: '100%',
                        marginLeft: 10,
                        fontSize: '1.2em',
                        fontFamily: 'Skia, sans-serif',
                    }} className='infoLabel'>{this.props.shop.description}</label>

                </div>


            </div>
        );
    }
}

export default withRouter(InfoColumn);