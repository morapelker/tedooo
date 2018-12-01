import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/shopActions'
import GenericShopsPage from "../common/GenericShopsPage";
import * as queryString from "query-string";
import RefreshIndicator from "../common/RefreshIndicator";
import shopApi from '../../api/shopApi';
import '../common/commonCss.css';
import './SearchResults.css';
import TedooButton from "../common/TedooButton";
import {bgColor} from "../../api/apiConstants";
import Stars from "../common/Stars";
import Collapse from "@material-ui/core/Collapse/Collapse";
import CheckBox from "../common/CheckBox";
import {LargeScreen, SmallScreen} from "../common/ScreenSizes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const MAX_SHOPS = 10;

class SearchResultsPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.searchParams = queryString.parse(this.props.location.search);
        this.state = {
            loading: true,
            resultTitle: '',
            results: [],
            smallLoading: false,
            stars: parseInt(this.searchParams.stars) || 0,
            expandRating: true,
            expandCities: true,
            expandMarkets: true,
            expandFilter: 0
        };
        this.state.page = parseInt(this.searchParams.page || '1', 0);
        delete this.searchParams.page;
        this.searchParams.$limit = MAX_SHOPS;
        this.findShops(this.state.page);
        if (this.searchParams.text)
            document.title = 'Tedooo - ' + this.searchParams.text;
        props.actions.resetTripArray();
        if (Array.isArray(props.manager.markets)) {

            this.cities = [...new Set(props.manager.markets.map(item => item.city))];

            const urlCities = this.searchParams.cities;
            if (urlCities) {
                const arr = urlCities.split(',').filter(item => item.length > 0);
                this.state.cities = this.cities.map(item => ({
                    name: item,
                    checked: arr.includes(item)
                }));
            } else {
                this.state.cities = this.cities.map(item => ({
                    name: item,
                    checked: false
                }));
            }

            if (urlCities) {
                this.state.markets = props.manager.markets.filter(item => {
                    const index = this.cities.indexOf(item.city);
                    if (index === -1)
                        return false;
                    return this.state.cities[index].checked;
                });
            } else
                this.state.markets = props.manager.markets;

            const urlMarkets = this.searchParams.markets;
            if (urlMarkets) {
                const arr = urlMarkets.split(',').filter(item => item.length > 0);
                this.state.markets = this.state.markets.map(item => ({
                    name: item.name,
                    checked: arr.includes(item.name)
                }));
            } else {
                this.state.markets = this.state.markets.map(item => ({
                    name: item.name,
                    checked: false
                }));
            }
        }


    }

    findShops = page => {
        this.searchParams.$skip = (page - 1) * MAX_SHOPS;
        this.queryId = Math.floor(Math.random() * 100);
        const q = this.queryId;
        shopApi.findShop(this.searchParams).then(shops => {
            if (q === this.queryId) {
                if (this.active) {
                    if (shops.total === 1)
                        this.props.history.replace('results/' + shops.data[0]._id);
                    else {
                        this.props.actions.findShopSuccess(shops.data);
                        this.setState({results: shops, loading: false, smallLoading: false});
                        this.props.actions.updateTripArray((page - 1) * MAX_SHOPS, shops.data, this.searchParams, shops.total)
                    }
                }
            }
        });
    };

    componentWillMount() {
        this.active = true;
    }

    componentWillUnmount() {
        this.active = false;
    }

    handlePageChange = (page) => {
        if (page !== this.state.page) {
            const s = Object.assign({}, this.searchParams);
            delete s.$limit;
            delete s.$skip;
            s.page = page;
            this.props.history.push('/results?' +
                queryString.stringify(s));
        }
    };


    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.location.search !== this.props.location.search)
            this.reloadShops(nextProps);
    }

    reloadShops = (props) => {
        this.searchParams = queryString.parse(props.location.search);
        const urlCities = this.searchParams.cities;
        let cities = this.state.cities;
        if (urlCities) {
            const arr = urlCities.split(',').filter(item => item.length > 0);
            cities.forEach(city => city.checked = (arr.includes(city.name)));
        } else
            cities.forEach(city => city.checked = false);


        const markets = (urlCities ?
            props.manager.markets.filter(item => {
                const index = this.cities.indexOf(item.city);
                if (index === -1)
                    return false;
                return this.state.cities[index].checked;
            })
            : props.manager.markets).map(item => ({
            name: item.name
        }));

        const urlMarkets = this.searchParams.markets;
        if (urlMarkets) {
            const mNames = markets.map(item => item.name);
            const arr = urlMarkets.split(',').filter(item => item.length > 0 && mNames.includes(item));
            if (arr.length === 0)
                delete this.searchParams.markets;
            else
                this.searchParams.markets = arr.reduce((acc, item) => acc + ',' + item, '');
            markets.forEach(market => market.checked = (arr.includes(market.name)));
        } else
            markets.forEach(market => market.checked = false);


        const p = parseInt(this.searchParams.page || '1', 0);
        this.setState({
            loading: true,
            resultTitle: '',
            results: [],
            smallLoading: false,
            stars: parseInt(this.searchParams.stars) || 0,
            page: p,
            cities,
            markets
        });
        delete this.searchParams.page;
        this.searchParams.$limit = MAX_SHOPS;
        this.findShops(p);
    };

    getResultTitle = () => {
        if (this.state.results.total === 1)
            return 1 + " Result";
        return this.state.results.total + " Results";
    };

    expandRating = () => {
        this.setState(prevState => ({expandRating: !prevState.expandRating}));
    };

    expandCities = () => {
        this.setState(prevState => ({expandCities: !prevState.expandCities}));
    };

    expandMarkets = () => {
        this.setState(prevState => ({expandMarkets: !prevState.expandMarkets}));
    };

    checkChangedCity = index => () => {
        const cities = this.state.cities;
        cities[index].checked = !cities[index].checked;
        const s = Object.assign({}, this.searchParams);
        delete s.$limit;
        delete s.$skip;
        if (cities.every(city => !city.checked))
            delete s.cities;
        else
            s.cities = cities.reduce((acc, item) => item.checked ? acc + ',' + item.name : acc, '');
        this.props.history.push('/results?' +
            queryString.stringify(s));
    };

    checkChangedMarket = index => () => {
        const markets = this.state.markets;
        markets[index].checked = !markets[index].checked;
        const s = Object.assign({}, this.searchParams);
        delete s.$limit;
        delete s.$skip;
        if (markets.every(market => !market.checked))
            delete s.markets;
        else
            s.markets = markets.reduce((acc, item) => item.checked ? acc + ',' + item.name : acc, '');
        this.props.history.push('/results?' +
            queryString.stringify(s));
    };

    resetFilter = () => {
        const s = Object.assign({}, this.searchParams);
        delete s.$limit;
        delete s.$skip;
        delete s.stars;
        delete s.cities;
        delete s.markets;
        this.props.history.push('/results?' +
            queryString.stringify(s));
    };

    handleFilter = stars => () => {
        const s = Object.assign({}, this.searchParams);
        delete s.$limit;
        delete s.$skip;
        if (stars && this.state.stars !== stars)
            s.stars = stars;
        else
            delete s.stars;
        this.props.history.push('/results?' +
            queryString.stringify(s));
    };

    setFilter = num => () => {
        this.setState(prevState => ({expandFilter: prevState.expandFilter === num ? 1 : num}));
    };

    render() {

        let citiesString;
        let marketsString;
        const cityCounter = this.state.cities.reduce((acc, item) => acc + (item.checked ? 1 : 0), 0);
        if (cityCounter === 0)
            citiesString = 'All Cities';
        else if (cityCounter === 1)
            this.state.cities.every(item => {
                if (item.checked) {
                    citiesString = item.name;
                    return false;
                }
                return true;
            });
        else
            citiesString = cityCounter + ' Cities';

        const marketCounter = this.state.markets.reduce((acc, item) => acc + (item.checked ? 1 : 0), 0);
        if (marketCounter === 0)
            marketsString = 'All Markets';
        else if (marketCounter === 1)
            this.state.markets.every(item => {
                if (item.checked) {
                    marketsString = item.name;
                    return false;
                }
                return true;
            });
        else
            marketsString = marketCounter + ' Markets';

        const isFiltering = this.state.stars !== 0 || marketCounter > 0 || cityCounter > 0;

        return (
            <div className={'search_result_root'}>
                <SmallScreen>
                    <FontAwesomeIcon
                        color={this.state.expandFilter !== 0 || isFiltering ? bgColor : '#c6c6c6'}
                        style={{
                            height: 40,
                            width: 40,
                            padding: 10,
                            position: 'absolute',
                            top: 0,
                            left: 20,
                            cursor: 'pointer'
                        }} onClick={() => {
                        this.setState(prevState => ({expandFilter: prevState.expandFilter !== 0 ? 0 : 1}));
                    }}
                        icon={'filter'}/>
                    <Collapse in={this.state.expandFilter !== 0}>
                        <div style={{
                            width: '100%',
                            fontSize: '1.3em',
                            textAlign: 'left',
                            padding: 10
                        }}>
                            <table style={{width: '100%'}}>
                                <tbody>
                                <tr onClick={this.setFilter(2)}>
                                    <td>Cities:</td>
                                    <td style={{width: '100%'}}>{citiesString}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <Collapse in={this.state.expandFilter === 2}>
                                            <div style={{
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}>
                                                {this.state.cities.map((item, index) =>
                                                    <CheckBox
                                                        checkChanged={this.checkChangedCity(index)}
                                                        text={item.name} key={index}
                                                        checked={item.checked}/>)}
                                            </div>
                                        </Collapse>
                                    </td>
                                </tr>
                                <tr onClick={this.setFilter(3)}>
                                    <td>Markets:</td>
                                    <td style={{width: '100%'}}>{marketsString}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <Collapse in={this.state.expandFilter === 3}>
                                            <div style={{
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}>
                                                {this.state.markets.map((item, index) =>
                                                    <CheckBox
                                                        checkChanged={this.checkChangedMarket(index)}
                                                        text={item.name} key={index}
                                                        checked={item.checked}/>)}
                                            </div>
                                        </Collapse>
                                    </td>
                                </tr>
                                <tr onClick={this.setFilter(4)}>
                                    <td>Rating:</td>
                                    <td style={{width: '100%'}}>{this.state.stars === 0 ? 'All Ratings' : this.state.stars + ' Stars and up'}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <Collapse in={this.state.expandFilter === 4}>
                                            <table style={{width: '100%'}}>
                                                <tbody>
                                                {[4, 3, 2, 1].map((item, index) =>
                                                    <tr key={index}
                                                        onClick={this.handleFilter(item)}
                                                        style={{cursor: 'pointer'}}>
                                                        <td><Stars iconClass={'star'} size={'1.5em'}
                                                                   stars={item} rating={-2}
                                                                   color={this.state.stars === item ? bgColor : undefined}/>
                                                        </td>
                                                        <td style={{
                                                            fontSize: '1.2em',
                                                            color: this.state.stars === item ? bgColor : 'black'
                                                        }}><span style={{marginLeft: 10}}>{item} and up</span>
                                                        </td>
                                                    </tr>)}
                                                </tbody>
                                            </table>
                                        </Collapse>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <TedooButton text={'reset'}
                                                     style={{width: 200, marginTop: 20}}
                                                     selectedBackground={bgColor}
                                                     selected={true}
                                                     selectedTextColor={'white'}
                                                     onClick={this.resetFilter}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </Collapse>
                </SmallScreen>
                <LargeScreen>
                    <div style={{height: '100%', minWidth: 250}}>
                        <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                        <span style={{background: '#eeeeee', fontSize: '1.3em', cursor: 'pointer'}}
                              onClick={this.expandMarkets}>Markets</span>
                            <Collapse in={this.state.expandMarkets}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginLeft: 10
                                }}>
                                    {this.state.markets.map((item, index) =>
                                        <CheckBox checkChanged={this.checkChangedMarket(index)}
                                                  text={item.name} key={index}
                                                  checked={item.checked}/>)}
                                </div>
                            </Collapse>
                            <span style={{
                                background: '#eeeeee',
                                fontSize: '1.3em',
                                cursor: 'pointer'
                            }}
                                  onClick={this.expandCities}>City</span>
                            <Collapse in={this.state.expandCities}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginLeft: 10
                                }}>
                                    {this.state.cities.map((item, index) =>
                                        <CheckBox checkChanged={this.checkChangedCity(index)}
                                                  text={item.name} key={index}
                                                  checked={item.checked}/>)}
                                </div>
                            </Collapse>
                            <span style={{
                                background: '#eeeeee',
                                fontSize: '1.3em',
                                cursor: 'pointer'
                            }}
                                  onClick={this.expandRating}>By Rating</span>
                            <Collapse in={this.state.expandRating}>
                                <table style={{marginTop: 10, marginLeft: 10}}>
                                    <tbody>
                                    {[4, 3, 2, 1].map((item, index) =>
                                        <tr key={index} onClick={this.handleFilter(item)}
                                            style={{cursor: 'pointer'}}>
                                            <td><Stars iconClass={'star'} size={'1.5em'}
                                                       stars={item} rating={-2}
                                                       color={this.state.stars === item ? bgColor : undefined}/>
                                            </td>
                                            <td style={{
                                                fontSize: '1.2em',
                                                color: this.state.stars === item ? bgColor : 'black'
                                            }}><span style={{marginLeft: 10}}>{item} and up</span>
                                            </td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </Collapse>
                        </div>
                        <TedooButton style={{marginTop: 30}} text={'reset'}
                                     selectedBackground={bgColor}
                                     selected={true}
                                     selectedTextColor={'white'} onClick={this.resetFilter}/>
                    </div>
                </LargeScreen>
                <div style={{flex: 1, height: '100%'}}>
                    {this.state.loading ? <RefreshIndicator/> :
                        <GenericShopsPage history={this.props.history}
                                          text={this.searchParams.text}
                                          pageChangeSelector={this.handlePageChange}
                                          currentPage={this.state.page}
                                          totalPages={this.state.results.total}
                                          smallLoading={this.state.smallLoading}
                                          handleFilter={this.handleFilter}
                                          addHistoryAction={this.props.actions.addShopHistory}
                                          name={this.getResultTitle()}
                                          shops={this.state.results.data}/>
                    }
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        manager: state.saved.manager,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);