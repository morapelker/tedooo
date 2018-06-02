import React, {Component} from 'react';
import TedooButton from "../../common/TedooButton";
import FileUploader from 'react-firebase-file-uploader';
import ImgWithLoader from "../../common/ImgWithLoader";
import RefreshIndicator from "../../common/RefreshIndicator";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
    root: {
        height: 20,
        width: 20,
        minHeight: 0,
        minWidth: 0,
        backgroundColor: 'red',
        color: 'white',
        cursor: 'pointer',
        position: 'absolute',
        top: 5,
        left: 5,
        zIndex: 999
    }, root2: {
        height: 25,
        width: 25,
        minHeight: 0,
        minWidth: 0,
        margin: 'auto',
        backgroundColor: 'white',
        color: '#3CBF95'
    }
});

class ImgUploader extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            uploading: false
        };
        this.ref = React.createRef();
    }

    openUploadDialog = () => {
        if (this.props.storageRef) {
            this.ref.current.children[0].value = '';
            this.ref.current.children[0].click();
        }

    };

    handleUploadStart = () => this.setState({uploading: true});

    handleUploadError = (error) => {
        this.setState({uploading: false, error});
        console.error(error);
    };

    handleUploadSuccess = (filename) => {
        this.props.storageRef.child(filename).getDownloadURL().then(url => {
            this.props.addImage(url);
            this.setState({uploading: false});
        });
    };

    render() {
        return (
            <div>
                {this.props.img_links.length > 0 || this.state.uploading ? <div style={{
                    height: 70,
                    backgroundColor: 'black',
                    marginLeft: 41,
                    overflowX: 'auto',
                    marginRight: 41,
                    display: 'flex'
                }}>
                    {this.props.img_links.map((link, index) => (
                        <div key={index} style={{width: 70, height: 70, position: 'relative',
                            marginLeft: index === 0 ? 0 : 5}}>
                            <ImgWithLoader style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }} src={link}/>
                            <Button onClick={()=>{
                                this.props.removeImage(index);
                            }} mini variant="fab" color="inherit" aria-label="add" classes={{
                                root: this.props.classes.root
                            }}>
                                <RemoveIcon style={{
                                    height: 20, width: 20
                                }} />
                            </Button>
                        </div>
                    ))}

                    <div style={{
                        height: 70,
                        width: 70,
                        backgroundColor: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        marginLeft: this.props.img_links.length === 0 ? 0 : 5
                    }}>
                        {this.state.uploading ? <RefreshIndicator style={{marginLeft: 10, alignSelf: 'center'}}/> :
                            <Button onClick={this.openUploadDialog} mini variant="fab" color="inherit" aria-label="add" classes={{
                                root: this.props.classes.root2
                            }}>
                                <AddIcon />
                            </Button>}

                        }
                    </div>

                </div> : <TedooButton
                    clearBackground={'white'}
                    selected={false}
                    deselectedTextColor={'#3CBF95'}
                    onClick={this.openUploadDialog}
                    text={'Upload Images'} style={{
                    alignSelf: 'flex-end',
                    width: '30%',
                    marginRight: '41px'
                }}/>}

                <label ref={this.ref} style={{display: 'none'}}>
                    <FileUploader
                        hidden
                        accept="image/*"
                        name="avatar"
                        randomizeFilename
                        maxWidth={400}
                        maxHeight={400}
                        storageRef={this.props.storageRef}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                    />
                </label>
            </div>
        );
    }
}

export default withStyles(styles)(ImgUploader);