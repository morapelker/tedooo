import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/shopActions'
import GenericShopsPage from "../common/GenericShopsPage";

class SearchResultsPage extends Component {
    render() {
        let resultTitle;
        if (this.props.results) {
            if (this.props.results.length === 1)
                resultTitle = '1 Result';
            else if (this.props.results.length === 0)
                resultTitle = 'Results';
            else
                resultTitle = this.props.results.length + ' Results';
        } else
            resultTitle = 'Results';
        return (
            <div style={{height: '100%', overflow: 'auto'}}>
                <GenericShopsPage history={this.props.history}
                                  addHistoryAction={this.props.actions.addShopHistory}
                                  name={resultTitle} shops={this.props.results}/>
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