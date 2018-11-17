import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';

class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={{width: '100%', height: '100%', background: 'red'}}>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps() {
    return {
        //actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);