import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/shopActions'
import TextFieldContainer from "../common/TextFieldContainer";
import SubmitButton from "../common/SubmitButton";

const styles = {
    mainDiv: {
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        margin: '0 auto'
    }
};

class AddShop extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
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
        const { fields } = this.state;
        fields[index].value = e.target.value;
        this.setState({fields});
    }

    submit() {
        console.log('submit');
    }

    render() {
        return (
            <div style={styles.mainDiv}>
                <p/>
                <h1>Add Shop</h1>
                <p/>
                <TextFieldContainer textChanged={this.textChanged}
                                    fields={this.state.fields}/>
                <SubmitButton submit={this.submit}/>
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