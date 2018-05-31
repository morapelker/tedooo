import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/authenticationActions'
import {bindActionCreators} from 'redux';
import TextFieldContainer from "../common/TextFieldContainer";
import SubmitButton from "../common/SubmitButton";
import Captcha from "../common/Captcha";
import RefreshIndicator from "../common/RefreshIndicator";
import {withRouter} from "react-router-dom";

const styles = {
    mainDiv: {
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        height: '100%',
        margin: '0 auto',
        minWidth: 300
    }
};

class Register extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            busy: false,
            captchaComplete: false,
            fields: [
                {
                    placeholder: 'Username',
                    value: ''
                }, {
                    placeholder: 'Password',
                    value: '',
                    type: 'password'
                }, {
                    placeholder: 'Confirm Password',
                    value: '',
                    type: 'password'
                }, {
                    placeholder: 'First Name',
                    value: ''
                }, {
                    placeholder: 'Last Name',
                    value: ''
                }
            ]
        };
    }

    onChange = () => {
        this.setState({
            captchaComplete: true
        });
    };

    onExpired = () => {
        this.setState({
            captchaComplete: false
        });
    };

    textChanged = e => {
        const index = e.target.id;
        const {fields} = this.state;
        fields[index].value = e.target.value;
        this.setState({fields});
    };

    validate = () => {
        let err = '';
        const result = this.state.fields.every(prop => {
            if (prop.value === '') {
                err = prop.placeholder + ' is required';
                return false;
            }
            return true;
        });
        if (!result)
            return err;
        if (this.state.fields[1].value !== this.state.fields[2].value)
            return 'Passwords do not match';

        if (!this.state.captchaComplete)
            return 'You must complete the captcha to continue';
        return undefined;
    };

    submit = () => {
        if (this.state.busy)
            return true;
        const error = this.validate();
        if (error) {
            this.setState({error});
        } else {
            this.setState({error, busy: true});
            const user = {
                username: this.state.fields[0].value,
                password: this.state.fields[1].value,
                firstName: this.state.fields[3].value,
                lastName: this.state.fields[4].value
            };
            console.log(user);
            this.props.actions.register(user).then(()=>{
                this.setState({busy: false});
                this.props.history.push('/login');
            }).catch(err => {
                this.setState({busy: false, error: err.message})
            });
        }
    };

    render() {
        return (
            <div style={styles.mainDiv}>
                <p/>
                <h3>Register</h3>
                <p/>
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    marginBottom: 10
                }}>
                    <TextFieldContainer textChanged={this.textChanged}
                                        fields={this.state.fields}/>
                    <p/>
                    <Captcha style={{
                        alignSelf: 'center',
                        marginBottom: 20
                    }} onChange={this.onChange}
                             onExpired={this.onExpired}
                    />
                    {this.state.error && <span style={{color: 'red'}}>{this.state.error}</span>}
                    {this.state.busy ? <RefreshIndicator style={{
                        alignSelf: 'center'
                    }} /> : <SubmitButton submit={this.submit}/>
                    }
                </div>

            </div>
        );
    }
}

function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));