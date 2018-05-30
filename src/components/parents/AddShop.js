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
        width: '30%',
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
                    name: 'marketName',
                    placeholder: 'Market Name',
                    value: '',
                    type: 'select',
                    suggestions: marketNamesFromMarkets(this.props.manager.markets),
                    selector: this.marketChanged,
                    onBlur: this.marketBlurred
                }, {
                    name: 'name',
                    placeholder: 'Name',
                    value: ''
                }, {
                    name: 'shopNumber',
                    placeholder: 'Shop Number',
                    value: ''
                }, {
                    name: 'category',
                    placeholder: 'Category',
                    value: ''
                }, {
                    name: 'phoneNumber',
                    placeholder: 'Phone Number',
                    value: ''
                }, {
                    name: 'wechatId',
                    placeholder: 'WeChat ID',
                    value: ''
                }
            ],
            market: {
                name: '',
                address: '',
                city: ''
            },
            lastMarketString: '',
        };
        this.getIndexForShopId = this.getIndexForShopId.bind(this);
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

    getIndexForShopId(id) {
        return this.state.fields.map(field => (field.name)).indexOf(id);
    }

    textChanged(e) {
        const index = this.getIndexForShopId(e.target.id);
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
                    <TextFieldContainer textChanged={this.textChanged}
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