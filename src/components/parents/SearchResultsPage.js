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
            page: 1,
            results: [],
            smallLoading: false
        };
        this.searchParams = queryString.parse(this.props.location.search);
        this.searchParams.$limit = MAX_SHOPS;
        this.searchParams.$skip = 0;
        this.findShops(0);
    }

    findShops = page => {
        this.searchParams.$skip = page * MAX_SHOPS;
        shopApi.findShop(this.searchParams).then(shops => {
            if (shops.total === 1)
                this.props.history.replace('results/' + shops.data[0]._id);
            else {
                this.props.actions.findShopSuccess(shops.data);
                this.setState({results: shops, loading: false, smallLoading: false});
            }
        });
    };

    getResultTitle = () => {
        if (this.state.results.total === 1)
            return 1 + " Result";
        return this.state.results.total + " Results";
    };

    handlePageChange = (page) => {
        if (page !== this.state.page) {
            this.setState({smallLoading: true, page});
            this.findShops(page - 1);
        }
    };

    render() {
        return (
            <div style={{height: '100%', overflow: 'auto'}}>
                {this.state.loading ? <RefreshIndicator/> :
                    <GenericShopsPage history={this.props.history}
                                      pageChangeSelector={this.handlePageChange}
                                      currentPage={this.state.page}
                                      smallLoading={this.state.smallLoading}
                                      totalPages={this.state.results.total}
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