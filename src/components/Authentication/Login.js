import React, {Component} from 'react';
import TextFieldContainer from "../common/TextFieldContainer";
import './authentication.css';
import SubmitButton from "../common/SubmitButton";
import RefreshIndicator from "../common/RefreshIndicator";

class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            busy: false,
            fields: [{
                name: 'username',
                placeholder: 'Username',
                value: ''
            }, {
                name: 'password',
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
        const index = e.target.id === 'username' ? 0 : 1;
        const fields = this.state.fields;
        fields[index].value = e.target.value;
        this.setState({fields, error: undefined});
    }

    submitForm() {
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
                        <SubmitButton submit={this.submitForm} />}

                </div>

            </div>
        );
    }
}

export default Login;