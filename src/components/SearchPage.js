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
import * as queryString from "query-string";
import {debounce, throttle} from "throttle-debounce";
import managerApi from "../api/managerApi";

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
            lastCategoryName: '',
            selectedCategoryId: '',
            lastSubCatName: '',
            generalFields: [
                {
                    name: 'text',
                    placeholder: 'What I\'m looking for',
                    value: '',
                    api: true,
                    type: 'select',
                    suggestions: props.textSuggestions.items,
                    selector: this.freeTextChanged,
                },
                {
                    name: 'marketName',
                    placeholder: 'Market Name',
                    value: '',
                    type: 'select',
                    suggestions: marketNamesFromMarkets(this.props.manager.markets),
                    selector: this.marketChanged,
                },
                {
                    name: 'shopNumber',
                    placeholder: 'Shop Number',
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
        this.autocompleteSearchDebounced = debounce(500, this.autoComplete);
        this.autocompleteSearchThrottled = throttle(500, this.autoComplete);

        this.textChanged = this.textChanged.bind(this);
        this.specificClicked = this.specificClicked.bind(this);
        this.submit = this.submit.bind(this);
        if (!this.props.session.loadedMarkets) {
            this.props.managerActions.loadMarkets().then(() => {
                const generalFields = this.state.generalFields;
                generalFields[1].suggestions = marketNamesFromMarkets(this.props.manager.markets);
                generalFields[3].suggestions = citiesFromMarkets(this.props.manager.markets);
                this.setState({generalFields});
            });
        }
        if (!this.props.session.loadedCategories) {
            this.props.managerActions.loadCategories();
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

    textChanged(e) {
        const index = e.target.id;
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
        if (this.state.busy)
            return;
        this.setState({
            busy: true,
            error: false
        });
        let searchParams;
        if (this.state.segStatus === 1) {
            searchParams = {};
            if (this.state.generalFields[0].value.length > 0)
                searchParams['text'] = this.state.generalFields[0].value;
            if (this.state.generalFields[1].value.length > 0)
                searchParams['market_name'] = this.state.generalFields[1].value;
            if (this.state.generalFields[2].value.length > 0)
                searchParams['shop_number'] = this.state.generalFields[2].value;
            if (this.state.generalFields[3].value.length > 0)
                searchParams['city'] = this.state.generalFields[3].value;
        } else
            searchParams = {phoneNumber: this.state.specificFields[0].value};

        searchParams.page = 1;
        const parsed = queryString.stringify(searchParams);
        this.props.history.push("/results?" + parsed);
    }

    cityChanged = (event, {newValue}) => {
        const generalFields = this.state.generalFields;
        generalFields[3].value = newValue;
        this.setState({generalFields});
    };

    marketChanged = (event, {newValue}) => {
        const generalFields = this.state.generalFields;
        generalFields[1].value = newValue;
        this.setState({generalFields});
    };

    autoComplete = newValue => {
        if (!newValue || newValue.length === 0)
            return;
        this.waitingFor = newValue;
        managerApi.loadAutoComplete(newValue).then(arr => {
            if (this.waitingFor === newValue) {
                const generalFields = this.state.generalFields;
                generalFields[0].suggestions = [];
                let counter = 0;
                const val = generalFields[0].value;
                arr.forEach(item => {
                    if (counter < 5 && item.toLowerCase() !== val.toLowerCase()) {
                        counter++;
                        generalFields[0].suggestions.push({label: item});
                    }
                });
                this.setState({generalFields});
            }
        });
    };

    freeTextChanged = (event, {newValue}) => {
        const generalFields = this.state.generalFields;
        generalFields[0].value = newValue;
        this.setState({generalFields}, () => {
            const q = this.state.generalFields[0].value;
            if (q.length < 5) {
                this.autocompleteSearchThrottled(q);
            } else {
                this.autocompleteSearchDebounced(q);
            }
        });

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
                                 deselectedTextColor={'white'}
                                 selectedBackground={'white'}
                                 selectedTextColor={'#3CBF95'}
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
        manager: state.saved.manager,
        session: state.session,
        textSuggestions: state.session.suggestions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        managerActions: bindActionCreators(managerActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));