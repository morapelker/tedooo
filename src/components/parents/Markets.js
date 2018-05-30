import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextFieldContainer from "../common/TextFieldContainer";
import RefreshIndicator from "../common/RefreshIndicator";
import SubmitButton from "../common/SubmitButton";
import * as actions from '../../actions/manager'

class Markets extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            busy: false,
            fields: [
                {
                    name: 'name',
                    value: '',
                    placeholder: 'Name'
                },{
                    name: 'address',
                    value: '',
                    placeholder: 'Address'
                },
                {
                    name: 'city',
                    value: '',
                    placeholder: 'City'
                }
            ],
        };
    }


    submit = () => {
        if (this.state.busy)
            return;
        this.setState({
            busy: true
        });
        const market = {
            name: this.state.fields[0].value,
            address: this.state.fields[1].value,
            city: this.state.fields[2].value
        };
        console.log(market);
        this.props.actions.createMarket(market).then(mar=>{
            console.log(mar);
            this.setState({
                busy: false
            });
        }).catch(err => {
            this.setState({
                busy: false
            });
        });
    };

    textChanged = e => {
        const fields = this.state.fields;
        const {id, value} = e.target;
        if (id === 'name')
            fields[0].value = value;
        else if (id === 'address')
            fields[1].value = value;
        else
            fields[2].value = value;
        this.setState({
            fields
        })
    };

    render() {
        return (
            <div>
                <p/>
                <h3>Add Market</h3>
                <p/>
                {this.props.auth.admin ?
                    <div style={{
                        width: '30%',
                        height: '100%',
                        margin: '0 auto',
                        minWidth: '300px'
                    }}>
                        <TextFieldContainer enterClicked={this.submit} textChanged={this.textChanged}
                                            fields={this.state.fields}/>
                        <p/>
                        {this.state.busy ? <RefreshIndicator style={{margin: '0 auto'}}/> :
                            <SubmitButton submit={this.submit}/>}
                    </div>
                    :
                    <h1>Not Admin</h1>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.saved.authentication,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Markets);