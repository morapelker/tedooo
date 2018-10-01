import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/shopActions'
import * as managerActions from '../actions/manager'
import './search.css';
import {withRouter} from "react-router-dom";
import RefreshIndicator from "./common/RefreshIndicator";
import TedooButton from "./common/TedooButton";
import * as queryString from "query-string";
import {debounce, throttle} from "throttle-debounce";
import managerApi from "../api/managerApi";
import QrReader from 'react-qr-reader'
import ApiAutoCompleteField from "./common/ApiAutoCompleteField";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import SearchIcon from '@material-ui/icons/Search';
import {bgColor} from "../api/apiConstants";

const styles = {
  button: {
      background: bgColor,
      borderRadius: 0,
      '&:focus': {
          backgroundColor: bgColor,
      },
      '&:hover': {
          backgroundColor: bgColor,
      },
  }
};

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
        };
        this.cached = {};
        this.active = true;
        this.autocompleteSearchDebounced = debounce(500, this.autoComplete);
        this.autocompleteSearchThrottled = throttle(500, this.autoComplete);

        this.submit = this.submit.bind(this);
    }

    componentWillUnmount() {
        this.active = false;
    }

    submit() {
        if (this.state.busy)
            return;
        this.setState({
            busy: true,
            error: false
        });

        const searchParams = {};
        if (this.state.textValue.length > 0)
            searchParams['text'] = this.state.textValue;
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
                <div style={{
                    width: '90%',
                    margin: '0 auto',
                    maxWidth: 500,
                    minWidth: 300
                }} onClick={() => {
                }}>
                    <div style={{marginTop: 20}}>
                        <div style={{display: 'flex'}}>
                            <ApiAutoCompleteField
                                value={this.state.textValue}
                                placeholder={'What are you looking for?'}
                                suggestions={this.state.textSuggestions}
                                onEnter={this.submit}
                                style={{flex: 1}}
                                method={this.state.textMethod}
                                onChange={this.freeTextChanged}/>
                            {this.state.busy ? <RefreshIndicator style={{margin: '0 auto'}}/> :
                                <Button variant="flat" className={this.props.classes.button} onClick={this.submit}>
                                    <SearchIcon />
                                </Button>
                            }
                        </div>
                        <p/>
                        <TedooButton
                            clearBackground={'white'}
                            selected={false}
                            deselectedTextColor={'#3CBF95'}
                            onClick={this.startScan}
                            text={'Scan QR Code'}/>
                    </div>
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

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage)));