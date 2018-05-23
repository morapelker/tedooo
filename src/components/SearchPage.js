import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/shopActions'
import TextFieldContainer from "./common/TextFieldContainer";
import './search.css';
import {withRouter} from "react-router-dom";
import RefreshIndicator from "./common/RefreshIndicator";
import TedooButton from "./common/TedooButton";
import SubmitButton from "./common/SubmitButton";


class SearchPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            busy: false,
            generalFields: [
                {
                    name: 'marketName',
                    placeholder: 'Market Name',
                    value: ''
                },
                {
                    name: 'shopNumber',
                    placeholder: 'Shop Number'
                },
                {
                    name: 'category',
                    placeholder: 'Category'
                },
                {
                    name: 'city',
                    placeholder: 'City'
                }
            ], specificFields: [
                {
                    name: 'phoneNumber',
                    placeholder: 'Phone Number/WeChat ID'
                }
            ],
            segStatus: 1
        };
        this.textChanged = this.textChanged.bind(this);
        this.getIndexForShopId = this.getIndexForShopId.bind(this);
        this.specificClicked = this.specificClicked.bind(this);
        this.submit = this.submit.bind(this);
    }

    generalClicked = () => {
        this.setState({
            segStatus: 1
        });
    };

    specificClicked() {
        this.setState({
            segStatus: 2
        });
    }

    getIndexForShopId(id) {
        if (this.state.segStatus === 1)
            return this.state.generalFields.map(field => (field.name)).indexOf(id);
        return this.state.specificFields.map(field => (field.name)).indexOf(id);
    }

    textChanged(e) {
        const index = this.getIndexForShopId(e.target.id);
        if (this.state.segStatus === 1) {
            const generalFields = this.state.generalFields;
            generalFields[index].value = e.target.value;
            this.setState({generalFields});
        } else {
            const specificFields = this.state.specificFields;
            specificFields[index].value = e.target.value;
            this.setState({specificFields});
        }
    }

    submit() {
        this.setState({
            busy: true
        });
        const searchParams = (this.state.segStatus === 1) ? {
            test: 'test',
            test2: 'test2'
        } : {
            phoneNumber: this.state.specificFields[0].value
        };

        this.props.actions.findShop(searchParams).then(() => {
            this.setState({
                busy: false
            });
            const results = this.props.state.results;
            if (results.length === 0)
                console.log('no results found');
            else if (results.length === 1)
                this.props.history.push("/results/" + results[0]._id);
            else
                this.props.history.push("/results/");
        });
    }

    render() {
        return (
            <div className='searchContainer'>
                <p/>
                <h1>Search</h1>
                <p/>
                <div className='segContainer'>
                    <TedooButton onClick={this.generalClicked} text={"General"}
                                 selected={this.state.segStatus === 1}
                                 selectedTextColor={'#3CBF95'}
                                 deselectedTextColor={'white'}
                                 selectedBackground={'white'}
                                 clearBackground={'#3CBF95'}
                    />
                    <TedooButton onClick={this.specificClicked} text={"Specific Shop"}
                                 selected={this.state.segStatus === 2}
                                 selectedTextColor={'#3CBF95'}
                                 deselectedTextColor={'white'}
                                 selectedBackground={'white'}
                                 clearBackground={'#3CBF95'}
                                 style={{marginLeft: 10}}
                    />
                </div>
                {this.state.segStatus === 1 ?
                    <TextFieldContainer textChanged={this.textChanged}
                                        fields={this.state.generalFields}/> :
                    <TextFieldContainer textChanged={this.textChanged}
                                        fields={this.state.specificFields}/>}
                <p/>
                {this.state.busy ? <RefreshIndicator/> :
                    <SubmitButton submit={this.submit}/>
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state.shops
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));