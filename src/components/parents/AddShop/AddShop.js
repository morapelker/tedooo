import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/shopActions'
import * as managerActions from '../../../actions/manager'
import * as firebaseActions from '../../../actions/firebaseActions'
import TextFieldContainer from "../../common/TextFieldContainer";
import SubmitButton from "../../common/SubmitButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Captcha from "../../common/Captcha";
import RefreshIndicator from "../../common/RefreshIndicator";
import ImgUploader from "./ImgUploader";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import IconButton from "@material-ui/core/IconButton/IconButton";
import MessageBox from "../../common/MessageBox";

const styles = {
    mainDiv: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        height: '100%',
        margin: '0 auto',
        minWidth: 300
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
                    placeholder: 'Phone Number',
                    value: '',
                    expandable: true,
                    parent: 4,
                }, {
                    placeholder: 'Phone Number',
                    value: '',
                    expandable: true,
                    minorable: true,
                    hidden: true,
                    parent: 4
                }, {
                    placeholder: 'Phone Number',
                    value: '',
                    hidden: true,
                    minorable: true,
                    parent: 4
                }, {
                    placeholder: 'WeChat ID',
                    value: '',
                    expandable: true,
                    parent: 7
                }, {
                    placeholder: 'WeChat ID',
                    value: '',
                    hidden: true,
                    minorable: true,
                    parent: 7
                }, {
                    placeholder: 'WeChat ID',
                    value: '',
                    hidden: true,
                    minorable: true,
                    parent: 7
                }
            ],
            market: {
                name: '',
                address: '',
                city: ''
            },
            lastMarketString: '',
            img_links: [],
            storageRef: undefined,
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

        if (!this.props.firebase.storageRef)
            this.props.firebaseActions.initFirebase().then(()=>{
                this.state.storageRef = firebase.storage().ref('web_images');
            });
        else
            this.state.storageRef = firebase.storage().ref('web_images');

        const {id} = this.props.match.params;
        if (id) {
            const shop = this.props.cachedShops[id];
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
                    const shop = this.props.cachedShops[this.props.match.params.id];
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
        if (shop.contact_info) {
            let phoneCounter = -1;
            let wechatCounter = -1;
            shop.contact_info.forEach(info => {
                if (info.type === 1) {
                    phoneCounter++;
                    if (phoneCounter === 0) {
                        fields[4].value = info.number;
                    } else if (phoneCounter < 3) {
                        fields[4 + phoneCounter].value = info.number;
                        fields[4 + phoneCounter].hidden = false;
                    }
                } else if (info.type === 2){
                    wechatCounter++;
                    if (wechatCounter === 0) {
                        fields[7].value = info.number;
                    } else if (wechatCounter < 3) {
                        fields[7 + wechatCounter].value = info.number;
                        fields[7 + wechatCounter].hidden = false;
                    }
                }
            });
        }
        return this.updateFields(fields);
    };

    updateFields = (f) => {
        const fields = f || this.state.fields;
        const num = this.getNumOfItems(4);
        fields[4] = Object.assign({}, fields[4], {expandable: (num < 3), minorable: (num > 1)});
        fields[5] = Object.assign({}, fields[5], {expandable: (num < 3), minorable: (num > 1)});
        fields[6] = Object.assign({}, fields[6], {expandable: (num < 3), minorable: (num > 1)});

        const num2 = this.getNumOfItems(7);
        fields[7] = Object.assign({}, fields[7], {expandable: (num2 < 3), minorable: (num2 > 1)});
        fields[8] = Object.assign({}, fields[8], {expandable: (num2 < 3), minorable: (num2 > 1)});
        fields[9] = Object.assign({}, fields[9], {expandable: (num2 < 3), minorable: (num2 > 1)});
        return fields;
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
        let err = '';
        const result = this.state.fields.every(prop => {
            if (prop.value === '' && !prop.hidden) {
                err = prop.placeholder + ' is required';
                return false;
            }
            return true;
        });
        if (!result)
            return err;
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
            this.props.actions.deleteShop(id,  this.props.authentication.token).then(() => {
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
            for (let i = 4; i < 7; i++) {
                if (this.state.fields[i].value !== '' && !this.state.fields[i].hidden) {
                    contact_info.push({
                        type: 1,
                        number: this.state.fields[i].value
                    });
                }
            }
            for (let i = 7; i < 10; i++) {
                if (this.state.fields[i].value !== '' && !this.state.fields[i].hidden) {
                    contact_info.push({
                        type: 2,
                        number: this.state.fields[i].value
                    });
                }
            }
            const shop = {
                name: this.state.fields[1].value,
                shop_number: this.state.fields[2].value,
                category: this.state.fields[3].value,
                market_name: this.state.market.name,
                address: this.state.market.address,
                city: this.state.market.city,
                qr_code: 'www.tedooo.com',
                img_links: this.state.img_links,
                contact_info2: contact_info
            };
            this.setState({busy: true});
            const {id} = this.props.match.params;
            if (id) {
                this.props.actions.alterShop(id, shop,  this.props.authentication.token).then(() => {
                    // this.props.history.push('/results/' + this.props.lastAddedId)
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

    onChange = () => {
        this.setState({captchaComplete: true, error: undefined});
    };

    onExpired = () => {
        this.setState({captchaComplete: false});
    };

    removeImage = index => {
        const {img_links} = this.state;
        img_links.splice(index, 1);
        this.setState({img_links});
    };

    onClose = () => {
        this.setState({deleteOpen: false});
        this.props.history.push('/');
    };

    render() {
        return (
            <div style={styles.mainDiv}>
                <p/>
                <h3>{this.props.match.params.id ? 'Edit' : 'Add'} Shop</h3>
                <p/>
                {this.state.initLoading && <RefreshIndicator style={{margin: '0 auto'}} />}
                {this.state.initError && <h3 style={{color: 'red'}}>Can't edit shop</h3>}
                {!this.state.initLoading && !this.state.initError &&
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    marginBottom: 10
                }}>
                    <TextFieldContainer onMinor={this.onMinor} onExtend={this.onExtend}
                                        textChanged={this.textChanged}
                                        fromAddShop={true}
                                        fields={this.state.fields}/>
                    <ImgUploader removeImage={this.removeImage} addImage={this.addImage} storageRef={this.state.storageRef}
                                 img_links={this.state.img_links}/>
                    <p/>
                    <Captcha style={{
                        alignSelf: 'center',
                        marginBottom: 20
                    }} onChange={this.onChange}
                             onExpired={this.onExpired}
                    />
                    {this.state.error && <span style={{color: 'red'}}>{this.state.error}</span>}
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
                    {this.props.match.params.id && !this.state.trashBusy && <IconButton onClick={this.delete} style={{
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
                        }} />
                    </IconButton>}
                </div>
                }
                <MessageBox title={'Delete Shop'} label={'Are you sure you want to delete "' + this.state.originalName + '"?'}
                            cancelText={'No'}
                            okText={'Yes, Delete Shop'}
                            onOk={this.deleteShop} onClose={this.cancelDelete} open={this.state.deleteConfirmOpen} />
                <MessageBox title={'Shop Deleted'} label={'Shop successfully deleted'} onOk={this.onClose} onClose={this.onClose} open={this.state.deleteOpen} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        manager: state.manager,
        authentication: state.saved.authentication,
        lastAddedId: state.shops.lastAddedId,
        firebase: state.firebase,
        cachedShops: state.shops.cachedShops
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        managerActions: bindActionCreators(managerActions, dispatch),
        firebaseActions: bindActionCreators(firebaseActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddShop);