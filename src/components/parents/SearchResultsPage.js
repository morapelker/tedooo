import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/shopActions'
import GenericShopsPage from "../common/GenericShopsPage";
import * as queryString from "query-string";
import RefreshIndicator from "../common/RefreshIndicator";
import shopApi from '../../api/shopApi';
import '../common/commonCss.css'
import TedooButton from "../common/TedooButton";
import {bgColor} from "../../api/apiConstants";
import Stars from "../common/Stars";
import Collapse from "@material-ui/core/Collapse/Collapse";
import CheckBox from "../common/CheckBox";
import {LargeScreen} from "../common/ScreenSizes";

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
            expandMarkets: true
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

    render() {
        return (
            <div style={{marginTop: 10, display: 'flex'}}>
                <LargeScreen>
                    <div style={{width: '15%', height: '100%', minWidth: 250}}>
                        <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                        <span style={{background: '#c3c3c3', fontSize: '1.3em', cursor: 'pointer'}}
                              onClick={this.expandMarkets}>Markets</span>
                            <Collapse in={this.state.expandMarkets}>
                                <div style={{display: 'flex', flexDirection: 'column', marginLeft: 10}}>
                                    {this.state.markets.map((item, index) =>
                                        <CheckBox checkChanged={this.checkChangedMarket(index)}
                                                  text={item.name} key={index}
                                                  checked={item.checked}/>)}
                                </div>
                            </Collapse>
                            <span style={{background: '#c3c3c3', fontSize: '1.3em', cursor: 'pointer'}}
                                  onClick={this.expandCities}>City</span>
                            <Collapse in={this.state.expandCities}>
                                <div style={{display: 'flex', flexDirection: 'column', marginLeft: 10}}>
                                    {this.state.cities.map((item, index) =>
                                        <CheckBox checkChanged={this.checkChangedCity(index)}
                                                  text={item.name} key={index}
                                                  checked={item.checked}/>)}
                                </div>
                            </Collapse>
                            <span style={{background: '#c3c3c3', fontSize: '1.3em', cursor: 'pointer'}}
                                  onClick={this.expandRating}>By Rating</span>
                            <Collapse in={this.state.expandRating}>
                                <table style={{marginTop: 10, marginLeft: 10}}>
                                    <tbody>
                                    {[4, 3, 2, 1].map((item, index) =>
                                        <tr key={index} onClick={this.handleFilter(item)}
                                            style={{cursor: 'pointer'}}>
                                            <td><Stars iconClass={'star'} size={'1.5em'} stars={item} rating={-2}
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
                        <TedooButton style={{marginTop: 30}} text={'reset'} selectedBackground={bgColor}
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