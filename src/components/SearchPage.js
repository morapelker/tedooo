import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/shopActions'
import * as managerActions from '../actions/manager'
import TextFieldContainer from "./common/TextFieldContainer";
import './search.css';
import {withRouter} from "react-router-dom";
import RefreshIndicator from "./common/RefreshIndicator";
import TedooButton from "./common/TedooButton";
import SubmitButton from "./common/SubmitButton";

function marketNamesFromMarkets(markets) {
    let marketNames = [];
    markets.forEach(market => {
        if (!marketNames.includes(market.name))
            marketNames.push(market.name);
    });
    return marketNames.map(market => ({label: market}));
}

function citiesFromMarkets(markets) {
    let cities = [];
    markets.forEach(market => {
        if (!cities.includes(market.city))
            cities.push(market.city);
    });
    return cities.map(city => ({label: city}));
}

class SearchPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            error: false,
            busy: false,
            generalFields: [
                {
                    name: 'marketName',
                    placeholder: 'Market Name',
                    value: '',
                    type: 'select',
                    suggestions: marketNamesFromMarkets(this.props.manager.markets),
                    selector: this.marketChanged
                },
                {
                    name: 'shopNumber',
                    placeholder: 'Shop Number',
                    value: ''
                },
                {
                    name: 'category',
                    placeholder: 'Category',
                    value: ''
                },
                {
                    name: 'city',
                    placeholder: 'City',
                    value: '',
                    type: 'select',
                    suggestions: citiesFromMarkets(this.props.manager.markets),
                    selector: this.cityChanged
                }
            ], specificFields: [
                {
                    name: 'phoneNumber',
                    placeholder: 'Phone Number/WeChat ID',
                    value: ''
                }
            ],
            segStatus: 1,
        };
        this.textChanged = this.textChanged.bind(this);
        this.getIndexForShopId = this.getIndexForShopId.bind(this);
        this.specificClicked = this.specificClicked.bind(this);
        this.submit = this.submit.bind(this);
        if (this.props.manager.markets.length === 0) {
            this.props.managerActions.loadMarkets().then(() => {
                const generalFields = this.state.generalFields;
                generalFields[0].suggestions = marketNamesFromMarkets(this.props.manager.markets);
                generalFields[3].suggestions = citiesFromMarkets(this.props.manager.markets);
                this.setState({generalFields});
            });
        }
    }

    generalClicked = () => {
        this.setState({
            segStatus: 1,
            error: false
        });
    };

    specificClicked() {
        this.setState({
            segStatus: 2,
            error: false
        });
    }

    getIndexForShopId(id) {
        if (this.state.segStatus === 1)
            return this.state.generalFields.map(field => (field.name)).indexOf(id);
        return this.state.specificFields.map(field => (field.name)).indexOf(id);
    }

    textChanged(e) {
        const index = this.getIndexForShopId(e.target.id);
        if (this.state.segStatus === 1) {
            const generalFields = this.state.generalFields;
            generalFields[index].value = e.target.value;
            this.setState({generalFields});
        } else {
            const specificFields = this.state.specificFields;
            specificFields[index].value = e.target.value;
            this.setState({specificFields});
        }
    }

    submit() {
        this.setState({
            busy: true,
            error: false
        });
        let searchParams;
        if (this.state.segStatus === 1) {
            searchParams = {};
            if (this.state.generalFields[0].value.length > 0)
                searchParams['market_name'] = this.state.generalFields[0].value;
            if (this.state.generalFields[1].value.length > 0)
                searchParams['shop_number'] = this.state.generalFields[1].value;
            if (this.state.generalFields[2].value.length > 0)
                searchParams['category'] = this.state.generalFields[2].value;
            if (this.state.generalFields[3].value.length > 0)
                searchParams['city'] = this.state.generalFields[3].value;
        } else
            searchParams = {phoneNumber: this.state.specificFields[0].value};

        this.props.actions.findShop(searchParams).then(() => {

            const results = this.props.state.results;
            if (results.length === 0) {
                this.setState({
                    busy: false,
                    error: true
                });
            } else {
                this.setState({
                    busy: false
                });
                if (results.length === 1)
                    this.props.history.push("/results/" + results[0]._id);
                else
                    this.props.history.push("/results/");
            }
        });
    }

    cityChanged = (event, {newValue}) => {
        const generalFields = this.state.generalFields;
        generalFields[3].value = newValue;
        this.setState({generalFields});
    };


    marketChanged = (event, {newValue}) => {
        const generalFields = this.state.generalFields;
        generalFields[0].value = newValue;
        this.setState({generalFields});
    };

    render() {
        return (
            <div className='searchContainer'>
                <p/>
                <h3>Search</h3>
                <p/>
                <div className='segContainer'>
                    <TedooButton onClick={this.generalClicked} text={"General"}
                                 selected={this.state.segStatus === 1}
                                 selectedTextColor={'#3CBF95'}
                                 deselectedTextColor={'white'}
                                 selectedBackground={'white'}
                                 clearBackground={'#3CBF95'}
                                 style={{width: 140}}
                    />
                    <TedooButton onClick={this.specificClicked} text={"Specific Shop"}
                                 selected={this.state.segStatus === 2}
                                 selectedTextColor={'#3CBF95'}
                                 deselectedTextColor={'white'}
                                 selectedBackground={'white'}
                                 clearBackground={'#3CBF95'}
                                 style={{marginLeft: 10, width: 140}}

                    />
                </div>

                {this.state.segStatus === 1 ?
                    <TextFieldContainer enterClicked={this.submit} textChanged={this.textChanged}
                                        fields={this.state.generalFields}/> :
                    <TextFieldContainer enterClicked={this.submit} textChanged={this.textChanged}
                                        fields={this.state.specificFields}/>}
                <p/>
                {this.state.busy ? <RefreshIndicator style={{margin: '0 auto'}}/> :
                    <SubmitButton submit={this.submit}/>
                }
                {this.state.error &&
                <h3 style={{color: 'red', fontWeight: 'normal', marginTop: 10}}>No shops found</h3>}

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state.shops,
        manager: state.manager,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        managerActions: bindActionCreators(managerActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));