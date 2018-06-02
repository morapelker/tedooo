import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/authenticationActions'

class SettingsPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            this.props.authentication.token === '' ? <h3 style={{color: 'red'}}>Not logged in</h3>
                : <div>
                    settings
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.saved.authentication
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);