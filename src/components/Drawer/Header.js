import React, {Component} from 'react';
import {bgColor} from "../../api/apiConstants";
import ApiAutoCompleteField from "../common/ApiAutoCompleteField";
import managerApi from "../../api/managerApi";
import * as queryString from "query-string";
import {debounce, throttle} from "throttle-debounce";
import './header.css';
import {withRouter} from "react-router";
import ImgWithLoader from "../common/ImgWithLoader";
import TedooDrawer from "./TedooDrawer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";
import TedooButton from "../common/TedooButton";
import withStyles from "@material-ui/core/styles/withStyles";
import {LargeScreen} from "../common/ScreenSizes";


const styles = {
    paper: {
        borderRadius: 20
    },
    button: {
        borderWidth: 1,
        borderStyle: 'solid',
        boxShadow: 'none',
        width: 150,
        height: 40,
        marginLeft: 10,
        marginRight: 10
    },
    rootActions: {
        marginBottom: 10,
        paddingRight: 15,
        paddingLeft: 15
    },
    rootContent: {
        paddingBottom: 10,
    }, dialogLabel: {
        textAlign: 'center',
        fontSize: '1.2em',
        color: '#3CBF95',
        fontFamily: 'Skia'
    }
};


const dotStyle = {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 40
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: '',
            textSuggestions: [],
            textMethod: '',
            logoutOpen: false,
            open: false
        };
        this.cached = {};
        this.active = true;
        this.autocompleteSearchDebounced = debounce(500, this.autoComplete);
        this.autocompleteSearchThrottled = throttle(500, this.autoComplete);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.textValue !== this.props.textValue) {
            this.setState({textValue: nextProps.textValue});
        }
    }

    componentWillUnmount() {
        this.active = false;
    }

    logout = () => {
        this.props.logOut();
        this.handleClose();
        this.props.history.push('/');
    };

    handleOpen = () => {
        this.setState({logoutOpen: true})
    };

    handleClose = () => {
        this.setState({logoutOpen: false})
    };

    openMenu = () => {
        this.setState({open: true});
    };

    closeMenu = () => {
        this.setState({open: false});
    };

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
    };

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

    handleNavigation = url => {
        this.props.history.push(url);
    };

    render() {
        const {classes, favCount, userName, avatar} = this.props;
        return (
            <div style={{
                borderBottom: '1px solid #c3c3c3',
                width: '100%',
                height: 200,
                background: 'white',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <TedooDrawer pendingCount={this.props.pendingCount}
                             logout={this.handleOpen} handleNavigation={this.handleNavigation}
                             title={this.props.title} auth={this.props.auth} open={this.state.open}
                             closeMenu={this.closeMenu}/>
                <div style={{width: '100%', flex: 1, background: bgColor}}>
                    <ImgWithLoader src={'/assets/banner.png'}
                                   style={{height: '100%', width: '100%', objectFit: 'cover'}}/>
                </div>
                <div style={{width: '100%', flex: 1, display: 'flex'}}>
                    <div className={'logo_parent1'}
                         style={{background: bgColor, cursor: 'pointer'}}>
                        <FontAwesomeIcon color={'#fff'}
                                         onClick={this.openMenu}
                                         icon={'bars'}
                                         size={'2x'}/>
                        <div className={'logo_parent2'} onClick={() => {
                            this.props.history.push('/');
                            this.setState({textValue: ''});
                        }}>
                            <span
                                style={{
                                    color: 'white',
                                    fontSize: '2em',
                                    fontWeight: 100
                                }}>Tedooo</span>
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                                <div style={dotStyle}/>
                                <div style={dotStyle}/>
                                <div style={dotStyle}/>
                            </div>
                        </div>
                    </div>
                    <div className={'search_parent'}
                         style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{
                            display: 'flex',
                            flex: 1,
                            maxWidth: 500,
                            alignItems: 'flex-end',
                            paddingBottom: 20
                        }}>
                            <ApiAutoCompleteField
                                value={this.state.textValue}
                                placeholder={'What are you looking for?'}
                                suggestions={this.state.textSuggestions}
                                onEnter={this.submit}
                                method={this.state.textMethod}
                                onChange={this.freeTextChanged}/>
                        </div>
                    </div>
                    <LargeScreen>
                        <div className={'action_parent'}>
                            {
                                avatar ?
                                    <div className={'avatar_header_container'}>
                                        <img src={avatar} alt={''} className={'avatar_header'}
                                             onClick={() => {
                                                 this.props.history.push('/settings');
                                             }}/>
                                    </div>
                                    : <FontAwesomeIcon
                                        onClick={() => {
                                            if (userName)
                                                this.props.history.push('/settings');
                                            else
                                                this.props.history.push('/login');
                                        }}
                                        color={'#c6c6c6'}
                                        style={{cursor: 'pointer'}}
                                        icon={['far', 'user']} size={'2x'}/>
                            }

                            {userName ? <div style={{
                                    marginLeft: 10,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    color: '#000',
                                    fontWeight: 'bold',
                                    alignItems: 'flex-start',
                                    cursor: 'pointer'
                                }}>
                                <span onClick={() => {
                                    this.props.history.push('/settings');
                                }}>{userName}</span>
                                    <span onClick={this.handleOpen}>Sign Out</span>
                                </div> :
                                <div
                                    onClick={() => {
                                        this.props.history.push('/login');
                                    }}
                                    style={{
                                        marginLeft: 10,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        color: '#000',
                                        cursor: 'pointer',
                                        alignItems: 'flex-start'
                                    }}>
                                    <span>{'Sign In | Join Free'}</span>
                                    <span>My Tedooo</span>
                                </div>
                            }

                            <FontAwesomeIcon
                                onClick={() => {
                                    this.props.history.push('/favorites')
                                }}
                                color={'#c6c6c6'}
                                style={{cursor: 'pointer', marginLeft: 20}}
                                icon={['far', 'heart']} size={'2x'}/>
                            <div onClick={() => {
                                this.props.history.push('/favorites')
                            }} style={{
                                marginLeft: 10,
                                display: 'flex',
                                flexDirection: 'column',
                                color: '#000',
                                alignItems: 'flex-start',
                                cursor: 'pointer'
                            }}>
                                <div style={{
                                    color: 'white',
                                    background: 'gray',
                                    width: 30,
                                    height: 30,
                                    borderRadius: 15,
                                    padding: 5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span>{favCount || 0}</span>
                                </div>
                                <span>Favorites</span>
                            </div>
                            <span style={{marginLeft: 10}}> | Get the App</span>
                            <span style={{marginLeft: 10}}> | English</span>
                        </div>
                    </LargeScreen>

                </div>
                <Dialog
                    open={this.state.logoutOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    classes={{
                        paper: classes.paper,
                    }}
                >
                    <DialogTitle id="form-dialog-title" disableTypography={true}><h4 style={{
                        textAlign: 'center',
                        width: '100%',
                        color: '#3CBF95',
                        fontWeight: 'bold'
                    }}>Logout</h4></DialogTitle>
                    <DialogContent classes={{
                        root: classes.rootContent
                    }}>
                        <DialogContentText classes={{
                            root: classes.dialogLabel
                        }} id="alert-dialog-description">
                            Are you sure you want to log out?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions classes={{
                        root: classes.rootActions
                    }}>
                        <TedooButton style={styles.button} selected={true}
                                     selectedTextColor={'white'}
                                     selectedBackground={'#3CBF95'}
                                     onClick={this.handleClose}
                                     text={'Stay logged in'}
                        />
                        <TedooButton style={styles.button} selected={true}
                                     selectedTextColor={'#3CBF95'}
                                     selectedBackground={'white'}
                                     onClick={this.logout}
                                     text={'Logout'}
                        />
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(Header));