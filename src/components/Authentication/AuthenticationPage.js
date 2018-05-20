import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/authenticationActions'
import {bindActionCreators} from 'redux';
import Login from "./Login";
import './authentication.css';

class AuthenticationPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <div>
                {this.props.state.token === '' ? <Login history={this.props.history} login={this.props.actions.login} /> : <div>
                    {this.props.state.admin ? 'hey boss ' + this.props.state.firstName : 'welcome back ' + this.props.state.firstName}
                </div>}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        state: state.saved.authentication
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationPage);