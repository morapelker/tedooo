import React, {Component} from 'react';
import TextFieldContainer from "../common/TextFieldContainer";
import './authentication.css';
import SubmitButton from "../common/SubmitButton";
import RefreshIndicator from "../common/RefreshIndicator";
import {Link} from "react-router-dom";

class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            busy: false,
            fields: [{
                placeholder: 'Username',
                value: ''
            }, {
                placeholder: 'Password',
                type: 'password',
                value: ''
            }],
            error: undefined
        };

        this.textChanged = this.textChanged.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    textChanged(e) {
        const index = e.target.id;
        const fields = this.state.fields;
        fields[index].value = e.target.value;
        this.setState({fields, error: undefined});
    }

    submitForm() {
        if (this.state.busy)
            return;
        this.setState({busy: true});
        this.props.login(this.state.fields[0].value, this.state.fields[1].value).then(() => {
            this.props.history.push("/");
        }).catch(error => {
            this.setState({error: error.message, busy: false})
        });
    }

    render() {
        return (
            <div>
                <p />
                <h3>Login</h3>
                <h4 style={{color: 'red'}}>{this.state.error}</h4>
                <div className="searchContainer">
                    <TextFieldContainer enterClicked={this.submitForm}
                                        textChanged={this.textChanged}
                                        fields={this.state.fields}/>
                    {this.state.busy ?
                        <RefreshIndicator style={{alignSelf: 'center'}} />
                        :
                        <div className={'submitDiv'}>
                            <SubmitButton submit={this.submitForm} />
                            <div style={{
                                flex: 1
                            }} />
                            <Link to={'/register'} style={{
                                marginLeft: 10,
                                alignSelf: 'center',
                                color: 'white',
                                textAlign: 'right',
                                flex: 1
                            }}>
                                <span>Register</span>
                            </Link>
                        </div>
                        }

                </div>

            </div>
        );
    }
}

export default Login;