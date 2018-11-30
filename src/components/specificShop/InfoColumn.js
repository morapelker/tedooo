import React, {Component} from 'react';
import './SpecificShop.css';
import InfoLabelContainer from "./InfoLabelContainer";
import QRCode from 'qrcode.react';
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core/index";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import {withRouter} from "react-router-dom";
import Modal from "@material-ui/core/Modal/Modal";


class InfoColumn extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {open: false, text: '', qrModalOpen: false};
    }

    closeModal = () => {
        this.setState({qrModalOpen: false});
    };

    openModal = () => {
        this.setState({qrModalOpen: true});
    };

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
        const labels = [this.props.shop.address];
        if (this.props.shop.address !== this.props.shop.market_name)
            labels.push(this.props.shop.market_name);
        labels.push('Shop Number: ' + this.props.shop.shop_number);
        if (this.props.shop.category && this.props.shop.category.length > 0 &&
            this.props.shop.description && this.props.shop.description.length > 0)
            labels.push('Category: ' + this.props.shop.category);

        return (
            <div className={'infoRoot'} style={this.props.style}>
                <div style={{
                    display: 'flex',
                    alignSelf: 'flex-end',
                    alignItems: 'flex-end',
                    position: 'relative'
                }}>
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
                    <InfoLabelContainer icon={'info'} labels={labels}/>

                    {this.props.shop.contact_info && <InfoLabelContainer icon={'phone'}
                                                                         labels={this.props.shop.contact_info.map(info => info.number)}/>}

                    {this.props.shop.qr_code
                    && this.props.shop.qr_code !== 'www.tedooo.com' && this.props.shop.qr_code.length !== 0
                    && <div className='infoBox' style={{marginTop: 15, marginBottom: 15}}
                            onClick={this.openModal}>
                        <QRCode value={this.props.shop.qr_code} fgColor='#000000'
                                bgColor='#ffffff'/>
                    </div>}

                    <label style={{
                        width: '100%',
                        marginLeft: 10,
                        fontSize: '1.2em',
                        fontFamily: 'Skia, sans-serif',
                    }}
                           className='infoLabel'>{this.props.shop.description && this.props.shop.description.length > 0 ?
                        this.props.shop.description : this.props.shop.category}</label>

                </div>

                <Modal open={this.state.qrModalOpen} onClose={this.closeModal}>
                    <div onClick={this.closeModal} style={{
                        width: '100%',
                        flexDirection: 'column',
                        background: '#3CBF95',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <QRCode value={this.props.shop.qr_code} fgColor='#000000'
                                bgColor='#ffffff'
                                style={{
                                    width: '90vmin', height: '90vmin',
                                    alignSelf: 'center'
                                }}/>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withRouter(InfoColumn);