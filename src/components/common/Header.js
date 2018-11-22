import React, {Component} from 'react';
import {bgColor} from "../../api/apiConstants";
import ApiAutoCompleteField from "./ApiAutoCompleteField";
import Button from "@material-ui/core/Button/Button";
import managerApi from "../../api/managerApi";
import * as queryString from "query-string";
import {debounce, throttle} from "throttle-debounce";
import './header.css';
import {withRouter} from "react-router";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: '',
            textSuggestions: [],
            textMethod: '',
        };
        this.cached = {};
        this.active = true;
        this.autocompleteSearchDebounced = debounce(500, this.autoComplete);
        this.autocompleteSearchThrottled = throttle(500, this.autoComplete);
    }

    componentWillUnmount() {
        this.active = false;
    }

    submit = () => {
        this.setState({
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

    render() {
        return (
            <div style={{
                borderBottom: '1px solid #c3c3c3',
                width: '100%',
                height: 200,
                background: 'white',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{width: '100%', flex: 1, background: 'red'}}/>
                <div style={{width: '100%', flex: 1, display: 'flex'}}>
                    <div className={'logo_parent'} style={{background: bgColor}}/>
                    <div className={'search_parent'} style={{background: 'red'}}>
                        <ApiAutoCompleteField
                            value={this.state.textValue}
                            placeholder={'What are you looking for?'}
                            suggestions={this.state.textSuggestions}
                            onEnter={this.submit}
                            style={{flex: 1}}
                            method={this.state.textMethod}
                            onChange={this.freeTextChanged}/>
                        <Button variant="flat"
                                onClick={this.submit}>
                            search
                        </Button>
                    </div>
                    <div className={'action_parent'} style={{background: 'blue'}}/>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);