import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/authenticationActions'
import Dropzone from 'react-dropzone'
import shopApi from '../../api/shopApi'

const dataURLToBlob = (dataURL) => {
    const BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
        const parts = dataURL.split(',');
        const contentType = parts[0].split(':')[1];
        const raw = parts[1];

        return new Blob([raw], {type: contentType});
    }

    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
};


function getOrientation(file, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {

        const view = new DataView(e.target.result);
        if (view.getUint16(0, false) !== 0xFFD8) {
            return callback(-2);
        }
        const length = view.byteLength;
        let offset = 2;
        while (offset < length) {
            if (view.getUint16(offset + 2, false) <= 8) return callback(-1);
            const marker = view.getUint16(offset, false);
            offset += 2;
            if (marker === 0xFFE1) {
                if (view.getUint32(offset += 2, false) !== 0x45786966) {
                    return callback(-1);
                }

                const little = view.getUint16(offset += 6, false) === 0x4949;
                offset += view.getUint32(offset + 4, little);
                const tags = view.getUint16(offset, little);
                offset += 2;
                for (let i = 0; i < tags; i++) {
                    if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                        return callback(view.getUint16(offset + (i * 12) + 8, little));
                    }
                }
            }
            else if ((marker & 0xFF00) !== 0xFF00) {
                break;
            }
            else {
                offset += view.getUint16(offset, false);
            }
        }
        return callback(-1);
    };
    reader.readAsArrayBuffer(file);
}

class SettingsPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {src: ''};
    }


    resize = (file, callback) => {
        // Ensure it's an image
        if (file.type.match(/image.*/)) {
            const reader = new FileReader();
            reader.onload = (readerEvent) => {

                const image = new Image();
                image.onload = () => {
                    let canvas = document.createElement('canvas'),
                        max_size = 400,
                        width = image.width,
                        height = image.height;
                    if (width > height) {
                        if (width > max_size) {
                            height *= max_size / width;
                            width = max_size;
                        }
                    } else {
                        if (height > max_size) {
                            width *= max_size / height;
                            height = max_size;
                        }
                    }
                    getOrientation(file, orientation => {
                        const ctx = canvas.getContext('2d');
                        if (4 < orientation && orientation < 9) {
                            canvas.width = height;
                            canvas.height = width;
                        } else {
                            canvas.width = width;
                            canvas.height = height;
                        }
                        switch (orientation) {
                            case 2:
                                ctx.transform(-1, 0, 0, 1, width, 0);
                                break;
                            case 3:
                                ctx.transform(-1, 0, 0, -1, width, height);
                                break;
                            case 4:
                                ctx.transform(1, 0, 0, -1, 0, height);
                                break;
                            case 5:
                                ctx.transform(0, 1, 1, 0, 0, 0);
                                break;
                            case 6:
                                ctx.transform(0, 1, -1, 0, height, 0);
                                break;
                            case 7:
                                ctx.transform(0, -1, -1, 0, height, width);
                                break;
                            case 8:
                                ctx.transform(0, -1, 1, 0, 0, width);
                                break;
                            default:
                                break;
                        }
                        ctx.drawImage(image, 0, 0, width, height);
                        const dataUrl = canvas.toDataURL('image/jpeg');
                        const resizedImage = dataURLToBlob(dataUrl);

                        callback(resizedImage, dataUrl);
                    });


                };
                image.src = readerEvent.target.result;
            };
            reader.readAsDataURL(file);
        }
    };


    onD = (accepted, rejected) => {
        if (accepted && accepted.length >= 1) {
            this.resize(accepted[0], (img, url) => {
                shopApi.uploadImage(img, this.props.authentication.token).then(res => console.log(res));
            });
        }
    };

    render() {
        return (
            this.props.authentication.token === '' ? <h3 style={{color: 'red'}}>Not logged in</h3>
                : <div>
                    <Dropzone onDrop={this.onD}>
                        <img src={this.state.src} alt={''} style={{width: '100%', height: '100%'}}/>
                        <button type="button">
                            Open File Dialog
                        </button>
                    </Dropzone>

                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.saved.authentication
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);