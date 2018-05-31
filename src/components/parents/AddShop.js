import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/shopActions'
import * as managerActions from '../../actions/manager'
import TextFieldContainer from "../common/TextFieldContainer";
import SubmitButton from "../common/SubmitButton";
import Captcha from "../common/Captcha";

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
    }

    updateFields = () => {
        const {fields} = this.state;
        const num = this.getNumOfItems(4);
        fields[4] = Object.assign({}, fields[4], {expandable: (num < 3), minorable: (num > 1)});
        fields[5] = Object.assign({}, fields[5], {expandable: (num < 3), minorable: (num > 1)});
        fields[6] = Object.assign({}, fields[6], {expandable: (num < 3), minorable: (num > 1)});

        const num2 = this.getNumOfItems(7);
        fields[7] = Object.assign({}, fields[7], {expandable: (num2 < 3), minorable: (num2 > 1)});
        fields[8] = Object.assign({}, fields[8], {expandable: (num2 < 3), minorable: (num2 > 1)});
        fields[9] = Object.assign({}, fields[9], {expandable: (num2 < 3), minorable: (num2 > 1)});
        this.setState({fields});
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
            if (index !== parent + 2){
                if (index === parent) {
                    fields[parent].value = fields[parent + 1].value;
                }
                fields[parent + 1].value = fields[parent + 2].value;
            }
        }
        this.updateFields();
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
        this.updateFields();
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
            if (prop.value === '') {
                err = prop.placeholder + ' is required';
                return false;
            }
            return true;
        });
        if (!result)
            return err;
        if (!this.state.captchaComplete)
            return 'You must complete the captcha before submitting';
        return undefined;
    };

    submit() {
        const error = this.validate();
        if (error) {
            this.setState({error});
        } else {
            const shop = {
                name: this.state.fields[1].value,
                shop_number: this.state.fields[2].value,
                category: this.state.fields[3].value,
                market_name: this.state.market.name,
                address: this.state.market.address,
                city: this.state.market.city,
                qr_code: 'www.tedooo.com',
                img_links: [],
                contact_info: [
                    {
                        type: 1,
                        number: this.state.fields[4].value
                    },
                    {
                        type: 2,
                        number: this.state.fields[5].value
                    }
                ]
            };
            this.props.actions.addShop(shop, this.props.authentication.token).then(() => {
                console.log('shop added');
            }).catch(err => {
                console.log('error', err);
            });
        }
    }

    onChange = () => {
        this.setState({captchaComplete: true, error: undefined});
    };

    onExpired = () => {
        this.setState({captchaComplete: false});
    };

    render() {
        return (
            <div style={styles.mainDiv}>
                <p/>
                <h3>Add Shop</h3>
                <p/>
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
                    <p/>
                    <Captcha style={{
                        alignSelf: 'center',
                        marginBottom: 20
                    }} onChange={this.onChange}
                             onExpired={this.onExpired}
                    />
                    {this.state.error && <span style={{color: 'red'}}>{this.state.error}</span>}
                    <SubmitButton submit={this.submit}/>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        manager: state.manager,
        authentication: state.saved.authentication,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        managerActions: bindActionCreators(managerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddShop);