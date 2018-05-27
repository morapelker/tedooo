import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/shopActions'
import TextFieldContainer from "../common/TextFieldContainer";
import SubmitButton from "../common/SubmitButton";
import Captcha from "../common/Captcha";

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

class AddShop extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            captchaComplete: false,
            fields: [
                {
                    name: 'marketName',
                    placeholder: 'Market Name',
                    value: ''
                }, {
                    name: 'name',
                    placeholder: 'Name',
                    value: ''
                }, {
                    name: 'shopNumber',
                    placeholder: 'Shop Number',
                    value: ''
                }, {
                    name: 'address',
                    placeholder: 'Address',
                    value: ''
                }, {
                    name: 'category',
                    placeholder: 'Category',
                    value: ''
                }, {
                    name: 'phoneNumber',
                    placeholder: 'Phone Number',
                    value: ''
                }, {
                    name: 'wechatId',
                    placeholder: 'WeChat ID',
                    value: ''
                }
            ]
        };
        this.getIndexForShopId = this.getIndexForShopId.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.submit = this.submit.bind(this);
    }

    getIndexForShopId(id) {
        return this.state.fields.map(field => (field.name)).indexOf(id);
    }

    textChanged(e) {
        const index = this.getIndexForShopId(e.target.id);
        const {fields} = this.state;
        fields[index].value = e.target.value;
        this.setState({fields});
    }

    submit() {
        if (this.state.captchaComplete)
            console.log('submit');
        else
            this.setState({error: 'You must complete the captcha before submitting'});
    }

    onChange = (e) => {
        this.setState({captchaComplete: true, error: undefined});
    };

    render() {
        return (
            <div style={styles.mainDiv}>
                <p/>
                <h3>Add Shop</h3>
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
                    }} onChange={this.onChange}/>
                    {this.state.error && <span style={{color: 'red'}}>{this.state.error}</span>}
                    <SubmitButton submit={this.submit}/>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddShop);