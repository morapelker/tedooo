import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/shopActions'
import GenericShopsPage from "../common/GenericShopsPage";

class SearchResultsPage extends Component {
    render() {
        return (
            <div>
                <GenericShopsPage history={this.props.history}
                                  addHistoryAction={this.props.actions.addShopHistory}
                                  name={'Results'} shops={this.props.results}/>
            </div>
        );
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