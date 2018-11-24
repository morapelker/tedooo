import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/shopActions'
import * as managerActions from '../actions/manager'
import './search.css';
import {withRouter} from "react-router-dom";
import TedooButton from "./common/TedooButton";
import * as queryString from "query-string";
import {debounce, throttle} from "throttle-debounce";
import managerApi from "../api/managerApi";
import QrReader from 'react-qr-reader'
import withStyles from "@material-ui/core/styles/withStyles";
import {bgColor} from "../api/apiConstants";
import CategoryBox from "./common/CategoryBox";

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

    componentDidMount() {
        this.props.catClicked && this.props.catClicked('');
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

    catClicked = text => {
        const searchParams = {text};
        searchParams.page = 1;
        const parsed = queryString.stringify(searchParams);
        this.props.catClicked && this.props.catClicked(text);
        this.props.history.push("/results?" + parsed);
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
                <div className={'category_root'} onClick={() => {
                }}>
                    <div style={{marginTop: 20, width: '100%'}}>
                        <h4 style={{textAlign: 'left', marginLeft: 50}}>My Markets</h4>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: '100%',
                        }}>
                            {Array.isArray(this.props.manager.categories) && this.props.manager.categories.map((category, index) =>
                                <CategoryBox src={category.img} key={index}
                                             onClick={this.catClicked}
                                             name={category.name}/>)}
                        </div>
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