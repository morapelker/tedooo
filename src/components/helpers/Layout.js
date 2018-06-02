import React, {Component} from 'react';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';
import Button from "@material-ui/core/Button/Button";

class Layout extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            avatar: '',
            isUploading: false,
            progress: 0,
            avatarURL: '',
            loading: false
        };
        const config = {
            apiKey: "AIzaSyC8pGP8wWTCJ5Dwj42bnwqExdnIiooFfIQ",
            projectId: "fir-imageupload-b88e2",
            storageBucket: "fir-imageupload-b88e2.appspot.com",
            messagingSenderId: "410862309349"
        };
        firebase.initializeApp(config);
        this.ref = React.createRef();
    }

    handleChangeUsername = (event) => this.setState({username: event.target.value});

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});

    handleProgress = (progress) => this.setState({progress});

    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    };

    handleUploadSuccess = (filename) => {
        this.setState({avatar: filename, progress: 100, isUploading: false});
        firebase.storage().ref('web_images').child(filename).getDownloadURL().then(url => {
            this.setState({avatarURL: url});
            console.log(url);
        });
    };

    openUploadBox = () => {
        this.ref.current.children[0].click();
    };

    render() {
        return (
            <div style={{
                width: '100%',
                height: '100%',
            }}>
                <span>{this.state.avatar}</span>
                {this.state.loading ? <span>loading</span> :
                    <form>
                        <label>Username:</label>
                        <input type="text" value={this.state.username} name="username" onChange={this.handleChangeUsername} />
                        <label>Avatar:</label>
                        {this.state.isUploading &&
                        <p>Progress: {this.state.progress}</p>
                        }
                        <span>{this.state.avatarURL}</span>
                        {this.state.avatarURL &&
                        <img src={this.state.avatarURL} alt={''} />
                        }
                        <Button onClick={this.openUploadBox}>Upload</Button>
                        <label ref={this.ref} style={{display: 'none'}}>
                            <FileUploader
                                hidden
                                accept="image/*"
                                name="avatar"
                                randomizeFilename
                                maxWidth={400}
                                maxHeight={400}
                                storageRef={firebase.storage().ref('web_images')}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                            />
                        </label>
                    </form>}

            </div>
        );
    }
}

export default Layout;