import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/shopActions'
import GenericShopsPage from "../common/GenericShopsPage";
import * as queryString from "query-string";
import RefreshIndicator from "../common/RefreshIndicator";
import shopApi from '../../api/shopApi';
import '../common/commonCss.css'

const MAX_SHOPS = 10;

class SearchResultsPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            resultTitle: '',
            results: [],
            smallLoading: false,
        };
        this.searchParams = queryString.parse(this.props.location.search);
        this.state.page = parseInt(this.searchParams.page || '1', 0);
        delete this.searchParams.page;
        this.searchParams.$limit = MAX_SHOPS;
        this.findShops(this.state.page);
        if (this.searchParams.text)
            document.title = 'Tedooo - ' + this.searchParams.text;
        props.actions.resetTripArray();
    }

    findShops = page => {
        this.searchParams.$skip = (page - 1) * MAX_SHOPS;
        shopApi.findShop(this.searchParams).then(shops => {
            if (this.active) {
                if (shops.total === 1)
                    this.props.history.replace('results/' + shops.data[0]._id);
                else {
                    this.props.actions.findShopSuccess(shops.data);
                    this.setState({results: shops, loading: false, smallLoading: false});
                    this.props.actions.updateTripArray((page - 1) * MAX_SHOPS, shops.data, this.searchParams, shops.total)
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

    componentWillReceiveProps(nextProps, context) {
        this.reloadShops(nextProps);
    }

    reloadShops = (props) => {
        this.searchParams = queryString.parse(props.location.search);
        const p = parseInt(this.searchParams.page || '1', 0);
        this.setState({
            loading: true,
            resultTitle: '',
            results: [],
            smallLoading: false,
            page: p
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

    render() {
        return (
            <div style={{marginTop: 10}}>
                {this.state.loading ? <RefreshIndicator/> :
                    <GenericShopsPage history={this.props.history}
                                      text={this.searchParams.text}
                                      pageChangeSelector={this.handlePageChange}
                                      currentPage={this.state.page}
                                      totalPages={this.state.results.total}
                                      smallLoading={this.state.smallLoading}
                                      addHistoryAction={this.props.actions.addShopHistory}
                                      name={this.getResultTitle()} shops={this.state.results.data}/>
                }
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);