import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/shopActions'
import * as managerActions from '../actions/manager'
import TextFieldContainer from "./common/TextFieldContainer";
import './search.css';
import {withRouter} from "react-router-dom";
import RefreshIndicator from "./common/RefreshIndicator";
import TedooButton from "./common/TedooButton";
import SubmitButton from "./common/SubmitButton";
import * as queryString from "query-string";
import {debounce, throttle} from "throttle-debounce";
import managerApi from "../api/managerApi";
import QrReader from 'react-qr-reader'
import ApiAutoCompleteField from "./common/ApiAutoCompleteField";

class SearchPage extends Component {
    constructor(props, context) {
        super(props, context);
        document.title = 'Tedooo';
        this.state = {
            error: false,
            busy: false,
            lastCategoryName: '',
            selectedCategoryId: '',
            lastSubCatName: '',
            textValue: '',
            textSuggestions: [],
            textMethod: '',
            specificFields: [
                {
                    name: 'phoneNumber',
                    placeholder: 'Phone Number/WeChat ID',
                    value: ''
                }
            ],
            segStatus: 1,
        };
        this.cached = {};
        this.active = true;
        this.autocompleteSearchDebounced = debounce(500, this.autoComplete);
        this.autocompleteSearchThrottled = throttle(500, this.autoComplete);

        this.specificClicked = this.specificClicked.bind(this);
        this.submit = this.submit.bind(this);
    }


    componentWillUnmount() {
        this.active = false;
    }

    generalClicked = () => {
        this.setState({
            segStatus: 1,
            error: false
        });
    };

    specificClicked() {
        this.setState({
            segStatus: 2,
            error: false
        });
    }

    submit() {
        if (this.state.busy)
            return;
        this.setState({
            busy: true,
            error: false
        });
        let searchParams;
        if (this.state.segStatus === 1) {
            searchParams = {};
            if (this.state.textValue.length > 0)
                searchParams['text'] = this.state.textValue;
        } else
            searchParams = {phoneNumber: this.state.specificFields[0].value};

        searchParams.page = 1;
        const parsed = queryString.stringify(searchParams);
        this.props.history.push("/results?" + parsed);
    }

    autoComplete = newValue => {
        if (!newValue || newValue.length === 0)
            return;
        if (newValue.endsWith(' '))
            newValue = newValue.trim() + '_';
        this.waitingFor = newValue;
        if (this.cached[newValue]) {
            const arr = this.cached[newValue];
            const textSuggestions = [];
            let counter = 0;
            const val = this.state.textValue;
            arr.forEach(item => {
                if (counter < 5 && item.toLowerCase() !== val.toLowerCase()) {
                    counter++;
                    textSuggestions.push({label: item});
                }
            });
            this.setState({textSuggestions});
            return;
        }
        managerApi.loadAutoComplete(newValue).then(arr => {
            if (this.waitingFor === newValue) {
                const textSuggestions = [];
                let counter = 0;
                const val = this.state.textValue;
                this.cached[newValue] = arr;
                arr.forEach(item => {
                    if (counter < 5 && item.toLowerCase() !== val.toLowerCase()) {
                        counter++;
                        textSuggestions.push({label: item});
                    }
                });
                if (this.active)
                    this.setState({textSuggestions});
            }
        });
    };

    freeTextChanged = (event, {newValue, method}) => {
        if (method !== 'type')
            this.waitingFor = '';

        this.setState({
            textValue: newValue,
            textMethod: method
        }, () => {
            if (method === 'type') {
                const q = newValue;
                if (q.length < 5 || q.endsWith('_')) {
                    this.autocompleteSearchThrottled(q);
                } else {
                    this.autocompleteSearchDebounced(q);
                }
            }
        });

    };

    startScan = () => {
        this.setState({scanning: true});
    };

    stopScan = () => {
        this.setState({scanning: false});
    };

    handleScan = (data) => {
        if (data != null) {
            if (this.state.busy)
                return;
            this.setState({
                busy: true,
                error: false,
                scanning: false
            });
            const searchParams = {qrCode: data};

            searchParams.page = 1;
            const parsed = queryString.stringify(searchParams);
            this.props.history.push("/results?" + parsed);
        }
    };

    handleError = () => {
    };


    render() {
        return (
            this.state.scanning ?
                <div className={'searchContainer'}>
                    <TedooButton
                        clearBackground={'white'}
                        selected={false}
                        deselectedTextColor={'#3CBF95'}
                        onClick={this.stopScan}
                        text={'Cancel'}/>
                    <QrReader
                        delay={2000}
                        onError={this.handleError}
                        onScan={this.handleScan}
                    />
                </div>
                :
                <div className='searchContainer' onClick={() => {
                }}>
                    <p/>
                    <h3>Search</h3>
                    <p/>

                    <div className='segContainer'>
                        <TedooButton onClick={this.generalClicked} text={"General"}
                                     selected={this.state.segStatus === 1}
                                     selectedTextColor={'#3CBF95'}
                                     deselectedTextColor={'white'}
                                     selectedBackground={'white'}
                                     clearBackground={'#3CBF95'}
                                     style={{width: 140}}
                        />
                        <TedooButton onClick={this.specificClicked} text={"Specific Shop"}
                                     selected={this.state.segStatus === 2}
                                     deselectedTextColor={'white'}
                                     selectedBackground={'white'}
                                     selectedTextColor={'#3CBF95'}
                                     clearBackground={'#3CBF95'}
                                     style={{marginLeft: 10, width: 140}}

                        />
                    </div>

                    {this.state.segStatus === 1 ?
                        <div style={{marginTop: 20}}>
                            <ApiAutoCompleteField
                                value={this.state.textValue}
                                placeholder={'What are you looking for?'}
                                suggestions={this.state.textSuggestions}
                                onEnter={this.submit}
                                method={this.state.textMethod}
                                onChange={this.freeTextChanged}/>
                        </div>
                        :
                        <div>
                            <TextFieldContainer enterClicked={this.submit}
                                                textChanged={this.textChanged}
                                                fields={this.state.specificFields}/>

                            <p/>
                            <TedooButton
                                clearBackground={'white'}
                                selected={false}
                                deselectedTextColor={'#3CBF95'}
                                onClick={this.startScan}
                                text={'Scan QR Code'}/>
                        </div>
                    }
                    <p/>
                    {this.state.busy ? <RefreshIndicator style={{margin: '0 auto'}}/> :
                        <SubmitButton submit={this.submit}/>
                    }
                    {this.state.error &&
                    <h3 style={{color: 'red', fontWeight: 'normal', marginTop: 10}}>No shops
                        found</h3>}

                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state.shops,
        manager: state.saved.manager,
        session: state.session,
        textSuggestions: state.session.suggestions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        managerActions: bindActionCreators(managerActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));