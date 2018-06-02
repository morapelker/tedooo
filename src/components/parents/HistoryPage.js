import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GenericShopsPage from "../common/GenericShopsPage";
import * as actions from '../../actions/shopActions'

class SearchResultsPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.deleteHistory = this.deleteHistory.bind(this);
    }

    render() {
        return (
            <div style={{height: '100%', overflow: 'auto'}}>
                <GenericShopsPage
                    history={this.props.history}
                    addHistoryAction={this.props.actions.addShopHistory}
                    name={'History'} deleteMethod={this.deleteHistory} shops={this.props.shops}/>
            </div>
        );
    }

    deleteHistory(id) {
        this.props.actions.deleteHistoryShop(id);
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