import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './settings_page.css';
import RefreshIndicator from "../common/RefreshIndicator";
import {resize} from "./AddShop/ImgUploaderAmazon";
import shopApi from "../../api/shopApi";
import * as actions from '../../actions/authenticationActions';
import managerApi from "../../api/managerApi";
import ImgWithLoader from "../common/ImgWithLoader";

class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploading: false
        };
    }

    imgSelected = e => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            this.setState({uploading: true});
            resize(file, img => {
                shopApi.uploadImage(img, this.props.auth.token).then(res => {
                    const avatarUrl = 'https://tedooo.s3.amazonaws.com/' + res.id;
                    managerApi.changeAvatar(this.props.auth.token, avatarUrl, this.props.auth.userId).then(() => {
                        this.props.actions.changeAvatar(avatarUrl);
                    }).finally(() => {
                        this.setState({uploading: false});
                    })
                }).catch(() => {
                    this.setState({uploading: false});
                });
            });
        }
    };

    render() {
        const avatar = this.props.auth.avatar || '/assets/yuan.jpeg';
        return (
            <div className={'settings_root'}>
                <div className={'settings_top_area'}>
                    <div className={'avatar_container'} onClick={() => {
                        this.inputRef.value = '';
                        this.inputRef.click();
                    }}>
                        {this.state.uploading ?
                            <div>
                                <span>Updating..</span><br/><br/>
                                <RefreshIndicator/>
                            </div>
                            :
                            <ImgWithLoader size={50} className={'avatar'} alt={''} src={avatar} fallback={'/assets/x.png'}/>
                        }
                    </div>
                    <span className={'username_label'}>{this.props.auth.firstName}</span>
                </div>
                <input style={{display: 'none'}} onChange={this.imgSelected} type={'file'}
                       ref={input => {
                           this.inputRef = input
                       }}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.saved.authentication
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);