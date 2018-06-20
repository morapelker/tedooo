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

function categoriesFrom(categories) {
    let categoryNames = [];
    categories.forEach(category => {
        if (!categoryNames.includes(category.parent))
            categoryNames.push(category.parent);
    });
    return categoryNames.map(category => ({label: category}));
}

function subcategoriesFor(categories, parent) {
    let subCategories = [];
    categories.forEach(category => {
        if (category.parent === parent)
            subCategories.push(category.name)
    });
    return subCategories.map(category => ({label: category}));
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
                    name: 'category',
                    placeholder: 'Category',
                    value: '',
                    type: 'select',
                    suggestions: categoriesFrom(this.props.manager.categories),
                    selector: this.categoryChanged,
                    onBlur: this.categoryBlurred
                },
                {
                    name: 'subcategory',
                    placeholder: 'Subcategory',
                    value: '',
                    type: 'select',
                    suggestions: [],
                    selector: this.subCategoryChanged,
                    onBlur: this.subCatBlurred,
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
        this.specificClicked = this.specificClicked.bind(this);
        this.submit = this.submit.bind(this);
        if (!this.props.session.loadedMarkets) {
            this.props.managerActions.loadMarkets().then(() => {
                const generalFields = this.state.generalFields;
                generalFields[0].suggestions = marketNamesFromMarkets(this.props.manager.markets);
                generalFields[4].suggestions = citiesFromMarkets(this.props.manager.markets);
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
                searchParams['market_name'] = this.state.generalFields[0].value;
            if (this.state.generalFields[1].value.length > 0)
                searchParams['shop_number'] = this.state.generalFields[1].value;
            if (this.state.generalFields[2].value.length > 0)
                searchParams['category'] = this.state.generalFields[2].value;
            if (this.state.generalFields[4].value.length > 0)
                searchParams['city'] = this.state.generalFields[4].value;
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
        generalFields[4].value = newValue;
        this.setState({generalFields});
    };

    subCatBlurred = () => {
        if (this.state.generalFields[3] !== this.state.lastSubCatName) {
            const generalFields = this.state.generalFields;
            generalFields[3].value = this.state.lastSubCatName;
            this.setState({generalFields});
        }
    };

    categoryBlurred = () => {
        if (this.state.generalFields[2].value === '') {
            const generalFields = this.state.generalFields;
            // generalFields[3].hidden = true;
            generalFields[3].value = '';
            this.setState({
                generalFields,
                lastCategoryName: '',
                selectedCategoryId: '',
                lastSubCatName: ''
            });
        } else if (this.state.generalFields[2].value !== this.state.lastCategoryName) {
            const generalFields = this.state.generalFields;
            generalFields[2].value = this.state.lastCategoryName;
            this.setState({generalFields});
        }
    };

    marketChanged = (event, {newValue}) => {
        const generalFields = this.state.generalFields;
        generalFields[0].value = newValue;
        this.setState({generalFields});
    };

    categoryChanged = (event, {newValue, method}) => {
        const generalFields = this.state.generalFields;
        generalFields[2].value = newValue;
        if (method !== 'type') {
            if (this.state.lastCategoryName !== newValue) {
                generalFields[3].suggestions = subcategoriesFor(this.props.manager.categories, newValue);
                generalFields[3].value = '';
                // generalFields[3].hidden = newValue === '';
                this.setState({generalFields, lastCategoryName: newValue});
            } else
                this.setState({generalFields});
        } else
            this.setState({generalFields});
    };

    subCategoryChanged = (event, {newValue, method}) => {
        const generalFields = this.state.generalFields;
        generalFields[3].value = newValue;
        if (method !== 'type')
            this.setState({generalFields, lastSubCatName: newValue, selectedCategoryId: 'a'});
        else
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
        manager: state.saved.manager,
        session: state.session
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        managerActions: bindActionCreators(managerActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));