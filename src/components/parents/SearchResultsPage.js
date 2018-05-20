import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/shopActions'
import GenericShopsPage from "../common/GenericShopsPage";

class SearchResultsPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.shopSelected = this.shopSelected.bind(this);
    }

    render() {
        return (
            <div>
                <GenericShopsPage name={'Results'} shopSelected={this.shopSelected} shops={this.props.results} />
            </div>
        );
    }

    shopSelected(shopId, shopName) {
        this.props.history.push("/results/" + shopId);
        this.props.actions.addShopHistory(shopId, shopName)
    }
}

function mapStateToProps(state) {
    return {
        results: state.shops.results
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);