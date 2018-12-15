import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/shopActions'
import * as managerActions from '../../../actions/manager'
import TextFieldContainer from "../../common/TextFieldContainer";
import SubmitButton from "../../common/SubmitButton";
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIndicator from "../../common/RefreshIndicator";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MessageBox from "../../common/MessageBox";
import {deepCloneObject} from "../../helpers/helpers";
import QrReader from 'react-qr-reader'
import ImgUploaderAmazon from "./ImgUploaderAmazon";
import TedooButton from "../../common/TedooButton";

const styles = {
    mainDiv: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflowY: 'scroll',
        height: '100%',
    }
};


function marketNamesFromMarkets(markets) {
    let suggestions = [];
    markets.forEach(market => {
        suggestions.push(market.name + " - " + market.city);
    });
    return suggestions.map(suggestion => ({label: suggestion}))
}

class AddShop extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            initLoading: false,
            initError: false,
            deleteConfirmOpen: false,
            deleteOpen: false,
            busy: false,
            captchaComplete: false,
            fields: [
                {
                    placeholder: 'Market Name',
                    value: '',
                    type: 'select',
                    suggestions: marketNamesFromMarkets(this.props.manager.markets),
                    selector: this.marketChanged,
                    onBlur: this.marketBlurred
                }, {
                    placeholder: 'Name',
                    value: ''
                }, {
                    placeholder: 'Shop Number',
                    value: ''
                }, {
                    placeholder: 'Category',
                    value: ''
                }, {
                    placeholder: 'Shop Description',
                    value: ''
                }, {
                    placeholder: 'Phone Number',
                    value: '',
                    expandable: true,
                    parent: 5,
                }, {
                    placeholder: 'Phone Number',
                    value: '',
                    expandable: true,
                    minorable: true,
                    hidden: true,
                    parent: 5
                }, {
                    placeholder: 'Phone Number',
                    value: '',
                    hidden: true,
                    minorable: true,
                    parent: 5
                }, {
                    placeholder: 'WeChat ID',
                    value: '',
                    expandable: true,
                    parent: 8
                }, {
                    placeholder: 'WeChat ID',
                    value: '',
                    hidden: true,
                    minorable: true,
                    parent: 8
                }, {
                    placeholder: 'WeChat ID',
                    value: '',
                    hidden: true,
                    minorable: true,
                    parent: 8
                }, {
                    placeholder: 'Search Keyword',
                    type: 'infinite',
                    values: [''],
                    extend: this.extendKeyword,
                    remove: this.removeKeyword,
                    change: this.changeKeyword
                }, {
                    placeholder: 'QR Code',
                    value: '',
                    qrSelector: this.startScan
                }
            ],
            market: {
                name: '',
                address: '',
                city: ''
            },
            lastMarketString: '',
            img_links: [],
            originalName: ''
        };
        this.textChanged = this.textChanged.bind(this);
        this.submit = this.submit.bind(this);
        if (this.props.manager.markets.length === 0) {
            this.props.managerActions.loadMarkets().then(() => {
                const fields = this.state.fields;
                fields[0].suggestions = marketNamesFromMarkets(this.props.manager.markets);
                this.setState({fields});
            });
        }

        const {id} = this.props.match.params;
        if (id) {
            const shop = deepCloneObject(this.props.cachedShops[id]);
            if (shop) {
                this.state.fields = this.updateShopFields(shop);
                this.state.img_links = shop.img_links;
                this.state.market = {
                    name: shop.market_name,
                    address: shop.address,
                    city: shop.city
                };
                this.state.originalName = shop.name;
            } else {
                this.state.initLoading = true;
                this.props.actions.findShopById(id).then(() => {
                    const shop = deepCloneObject(this.props.cachedShops[this.props.match.params.id]);
                    if (shop !== undefined) {
                        this.setState({
                            fields: this.updateShopFields(shop),
                            initLoading: false,
                            img_links: shop.img_links,
                            market: {
                                name: shop.market_name,
                                address: shop.address,
                                city: shop.city
                            },
                            originalName: shop.name
                        });
                    } else {
                        this.setState({initLoading: false, initError: true})
                    }
                });
            }
        }

    }


    updateShopFields = (shop) => {
        const {fields} = this.state;
        fields[0].value = shop.market_name + (shop.city ? ' - ' + shop.city : '');
        fields[1].value = shop.name;
        fields[2].value = shop.shop_number;
        fields[3].value = shop.category;
        fields[4].value = shop.description || '';
        fields[12].value = shop.qr_code;
        if (!Array.isArray(shop.keywords) || shop.keywords.length === 0)
            fields[11].values = [''];
        else
            fields[11].values = shop.keywords;
        if (shop.contact_info) {
            let phoneCounter = -1;
            let wechatCounter = -1;
            shop.contact_info.forEach(info => {
                if (info.type === 1) {
                    phoneCounter++;
                    if (phoneCounter === 0) {
                        fields[5].value = info.number;
                    } else if (phoneCounter < 3) {
                        fields[5 + phoneCounter].value = info.number;
                        fields[5 + phoneCounter].hidden = false;
                    }
                } else if (info.type === 2) {
                    wechatCounter++;
                    if (wechatCounter === 0) {
                        fields[8].value = info.number;
                    } else if (wechatCounter < 3) {
                        fields[8 + wechatCounter].value = info.number;
                        fields[8 + wechatCounter].hidden = false;
                    }
                }
            });
        }
        return this.updateFields(fields);
    };

    updateFields = (f) => {
        const fields = f || this.state.fields;
        const num = this.getNumOfItems(5);
        fields[5] = Object.assign({}, fields[5], {expandable: (num < 3), minorable: (num > 1)});
        fields[6] = Object.assign({}, fields[6], {expandable: (num < 3), minorable: (num > 1)});
        fields[7] = Object.assign({}, fields[7], {expandable: (num < 3), minorable: (num > 1)});

        const num2 = this.getNumOfItems(8);
        fields[8] = Object.assign({}, fields[8], {expandable: (num2 < 3), minorable: (num2 > 1)});
        fields[9] = Object.assign({}, fields[9], {expandable: (num2 < 3), minorable: (num2 > 1)});
        fields[10] = Object.assign({}, fields[10], {expandable: (num2 < 3), minorable: (num2 > 1)});
        return fields;
    };

    startUploadLoading = () => {
        this.setState({busy: true});
    };

    stopUploadLoading = () => {
        this.setState({busy: false});
    };

    addImage = link => {
        const {img_links} = this.state;
        img_links.push(link);
        this.setState({img_links});
    };

    onMinor = index => {
        const {fields} = this.state;
        const parent = fields[index].parent;
        const numOfItems = this.getNumOfItems(parent);
        if (numOfItems === 1) {
            fields[index].value = '';
        } else if (numOfItems === 2) {
            if (index === parent)
                fields[parent].value = fields[parent + 1].value;
            fields[parent + 1].hidden = true;
        } else {
            fields[parent + 2].hidden = true;
            if (index !== parent + 2) {
                if (index === parent) {
                    fields[parent].value = fields[parent + 1].value;
                }
                fields[parent + 1].value = fields[parent + 2].value;
            }
        }
        this.setState({fields: this.updateFields()})

    };

    onExtend = (index) => {
        const {fields} = this.state;
        const parent = fields[index].parent;
        const numOfItems = this.getNumOfItems(parent);
        if (numOfItems === 1) {
            fields[parent + 1].hidden = false;
            fields[parent + 1].value = '';
        } else if (numOfItems === 2) {
            if (index === parent) {
                fields[index + 2].value = fields[index + 1].value;
                fields[index + 1].value = '';
            } else
                fields[parent + 2].value = '';
            fields[parent + 2].hidden = false;

        } else {
            return;
        }
        this.setState({fields: this.updateFields()})
    };

    getNumOfItems = parent => {
        const {fields} = this.state;
        if (fields[parent + 1].hidden)
            return 1;
        else if (fields[parent + 2].hidden)
            return 2;
        else
            return 3;
    };


    marketBlurred = () => {
        const {fields} = this.state;
        fields[0].value = this.state.lastMarketString;
        this.setState({fields});
    };

    marketChanged = (e, {newValue, method}) => {
        const {fields} = this.state;
        fields[0].value = newValue;
        this.setState({fields});
        if (method !== 'type') {
            this.props.manager.markets.some(market => {
                if ((market.name + " - " + market.city) === newValue) {
                    this.setState({
                        market: {
                            name: market.name,
                            city: market.city,
                            address: market.address
                        },
                        lastMarketString: newValue
                    });
                    return true;
                }
                return false;
            });
        }
    };

    textChanged(e) {
        const index = e.target.id;
        const {fields} = this.state;
        fields[index].value = e.target.value;
        this.setState({fields});
    }

    validate = () => {
        // let err = '';
        // const result = this.state.fields.every(prop => {
        //     if (prop.value === '' && !prop.hidden) {
        //         err = prop.placeholder + ' is required';
        //         return false;
        //     }
        //     return true;
        // });
        // if (!result)
        //     return err;
        // if (!this.state.captchaComplete)
        //     return 'You must complete the captcha before submitting';
        return undefined;
    };

    delete = () => {
        this.setState({deleteConfirmOpen: true});
    };

    deleteShop = () => {
        const {id} = this.props.match.params;
        if (id) {
            this.setState({trashBusy: true, deleteConfirmOpen: false});
            this.props.actions.deleteShop(id, this.props.authentication.token).then(() => {
                this.setState({deleteOpen: true});
            });
        }
    };

    cancelDelete = () => {
        this.setState({deleteConfirmOpen: false});
    };

    submit() {
        const error = this.validate();
        if (error) {
            this.setState({error});
        } else {
            let contact_info = [];
            for (let i = 5; i < 8; i++) {
                if (this.state.fields[i].value !== '' && !this.state.fields[i].hidden) {
                    contact_info.push({
                        type: 1,
                        number: this.state.fields[i].value
                    });
                }
            }
            for (let i = 8; i < 11; i++) {
                if (this.state.fields[i].value !== '' && !this.state.fields[i].hidden) {
                    contact_info.push({
                        type: 2,
                        number: this.state.fields[i].value
                    });
                }
            }
            const keywords = [];
            this.state.fields[11].values.forEach(item => {
                if (item.length > 0)
                    keywords.push(item);
            });

            const shop = {
                name: this.state.fields[1].value,
                shop_number: this.state.fields[2].value,
                category: this.state.fields[3].value,
                description: this.state.fields[4].value,
                market_name: this.state.market.name,
                address: this.state.market.address,
                city: this.state.market.city,
                img_links: this.state.img_links,
                contact_info2: contact_info,
                keywords,
                qr_code: this.state.fields[12].value
            };
            this.setState({busy: true});
            const {id} = this.props.match.params;
            if (id) {
                this.props.actions.alterShop(id, shop, this.props.authentication.token).then(() => {
                    this.props.history.push('/results/' + this.props.lastAddedId)
                });
            } else {
                this.props.actions.addShop(shop, this.props.authentication.token).then(() => {
                    this.props.history.push('/results/' + this.props.lastAddedId)
                }).catch(error => {
                    this.setState({error: error.message, busy: false});
                });
            }

        }
    }

    removeImage = index => {
        const {img_links} = this.state;
        img_links.splice(index, 1);
        this.setState({img_links});
    };

    onClose = () => {
        this.setState({deleteOpen: false});
        this.props.history.push('/');
    };

    changeImageOrder = (_, from, to) => {
        const imgLinks = this.state.img_links;
        const tmpImage = imgLinks[from];
        imgLinks.splice(from, 1);
        imgLinks.splice(to, 0, tmpImage);
        this.setState({img_links: imgLinks});
    };

    handleScan = (data) => {
        if (data != null) {
            const {fields} = this.state;
            fields[12].value = data;
            this.setState({fields, scanning: false});
        }
    };

    handleError = () => {
    };


    stopScan = () => {
        this.setState({scanning: false});
    };

    startScan = () => {
        this.setState({scanning: true});
    };


    extendKeyword = index => {
        const {fields} = this.state;
        fields[11].values.splice(index + 1, 0, '');
        this.setState({fields});
    };

    removeKeyword = index => {
        const {fields} = this.state;
        if (fields[11].values.length === 1)
            fields[11].values[0] = '';
        else
            fields[11].values.splice(index, 1);
        this.setState({fields});
    };

    changeKeyword = (value, index) => {
        const {fields} = this.state;
        fields[11].values[index] = value;
        this.setState({fields});
    };

    render() {
        return (
            <div style={styles.mainDiv}>
                {this.state.scanning ?
                    <div style={{width: '40%', margin: '0 auto'}}>
                        <TedooButton
                            clearBackground={'white'}
                            selected={false}
                            deselectedTextColor={'#3CBF95'}
                            onClick={this.stopScan}
                            style={{width: '100%'}}
                            text={'Cancel'}/>
                        <QrReader
                            delay={2000}
                            onError={this.handleError}
                            onScan={this.handleScan}
                        />
                    </div> :
                    <div style={{
                        minWidth: 300,
                        width: '40%', display: 'flex', flexDirection: 'column', margin: '0 auto'
                    }}>
                        <p/>
                        <h3>{this.props.match.params.id ? 'Modify' : 'Add'} Shop</h3>
                        <p/>
                        {this.state.initLoading && <RefreshIndicator style={{margin: '0 auto'}}/>}
                        {this.state.initError && <h3 style={{color: 'red'}}>Can't edit shop</h3>}
                        {!this.state.initLoading && !this.state.initError &&
                        <div style={{
                            width: '100%',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: 10
                        }}>
                            <TextFieldContainer onMinor={this.onMinor} onExtend={this.onExtend}
                                                textChanged={this.textChanged}
                                                fromAddShop={true}
                                                fields={this.state.fields}/>

                            <ImgUploaderAmazon
                                startUpload={this.startUploadLoading}
                                stopUpload={this.stopUploadLoading}
                                callback={this.changeImageOrder}
                                removeImage={this.removeImage}
                                token={this.props.authentication.token}
                                addImage={this.addImage}
                                img_links={this.state.img_links}
                            />
                            <p/>
                            {this.state.error &&
                            <span style={{color: 'red'}}>{this.state.error}</span>}
                            {!this.state.busy ? <SubmitButton submit={this.submit}/> :
                                <RefreshIndicator style={{alignSelf: 'center'}}/>}
                            {this.state.trashBusy && <div style={{
                                width: 50,
                                height: 50,
                                position: 'absolute',
                                top: 15,
                                right: 30,
                            }}>
                                <RefreshIndicator
                                    loadingColor={'#cf392b'}
                                    size={50}
                                />
                            </div>}
                            {this.props.match.params.id && !this.state.trashBusy &&
                            <IconButton onClick={this.delete} style={{
                                position: 'absolute',
                                right: 30,
                                height: 50,
                                width: 50,
                                top: 15,
                                color: '#cf392b',
                            }} aria-label="Delete">
                                <DeleteIcon style={{
                                    width: 30,
                                    height: 30
                                }}/>
                            </IconButton>}
                        </div>
                        }
                        <MessageBox title={'Delete Shop'}
                                    label={'Are you sure you want to delete "' + this.state.originalName + '"?'}
                                    cancelText={'No'}
                                    okText={'Yes, Delete Shop'}
                                    onOk={this.deleteShop} onClose={this.cancelDelete}
                                    open={this.state.deleteConfirmOpen}/>
                        <MessageBox title={'Shop Deleted'} label={'Shop successfully deleted'}
                                    onOk={this.onClose} onClose={this.onClose}
                                    open={this.state.deleteOpen}/>
                    </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        manager: state.saved.manager,
        authentication: state.saved.authentication,
        lastAddedId: state.shops.lastAddedId,
        cachedShops: state.shops.cachedShops
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        managerActions: bindActionCreators(managerActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddShop);