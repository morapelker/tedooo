import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GenericShopsPage from "../common/GenericShopsPage";
import * as actions from '../../actions/shopActions'

class SearchResultsPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.shopSelected = this.shopSelected.bind(this);
        this.deleteHistory = this.deleteHistory.bind(this);
    }

    render() {
        return (
            <GenericShopsPage name={'History'} deleteMethod={this.deleteHistory} shopSelected={this.shopSelected} shops={this.props.shops}/>
        );
    }

    deleteHistory(id) {
        this.props.actions.deleteHistoryShop(id);
    }

    shopSelected(shopId, shopName) {
        this.props.history.push("/results/" + shopId);
        this.props.actions.addShopHistory(shopId, shopName);
    }
}

function mapStateToProps(state) {
    return {
        shops: state.saved.local.history
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);