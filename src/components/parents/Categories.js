import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextFieldContainer from "../common/TextFieldContainer";
import RefreshIndicator from "../common/RefreshIndicator";
import SubmitButton from "../common/SubmitButton";
import managerApi from "../../api/managerApi";

class Categories extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            busy: false,
            fields: [
                {
                    value: '',
                    placeholder: 'Name'
                }, {
                    value: '',
                    placeholder: 'Image URL'
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
        const category = {
            name: this.state.fields[0].value,
            img: this.state.fields[1].value
        };
        managerApi.createCategory(category, this.props.auth.token).then((res) => {
            this.setState({busy: false});
        });
    };

    textChanged = e => {
        const fields = this.state.fields;
        const {id, value} = e.target;
        fields[id].value = value;
        this.setState({
            fields
        })
    };

    render() {
        return (
            <div>
                <p/>
                <h3>Add Category</h3>
                <p/>
                {this.props.auth.admin ?
                    <div style={{
                        width: '30%',
                        height: '100%',
                        margin: '0 auto',
                        minWidth: '300px'
                    }}>
                        <TextFieldContainer enterClicked={this.submit}
                                            textChanged={this.textChanged}
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

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);