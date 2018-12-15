import React, {Component} from 'react';
import Dropzone from "react-dropzone";
import shopApi from "../../../api/shopApi";
import SmallImageContainer from "./SmallImageContainer";
import TedooButton from "../../common/TedooButton";
import Button from "@material-ui/core/Button/Button";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import RefreshIndicator from "../../common/RefreshIndicator";
import ImgWithLoader from "../../common/ImgWithLoader";
import Reorder from 'react-reorder';
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
        zIndex: 99
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
            } else if ((marker & 0xFF00) !== 0xFF00) {
                break;
            } else {
                offset += view.getUint16(offset, false);
            }
        }
        return callback(-1);
    };
    reader.readAsArrayBuffer(file);
}


// warning try to limit calls to this function as it can cause problems on some systems
// as they try to keep up with GC
// This function gets the file size by counting the number of Base64 characters and
// calculating the number of bytes encoded.
function getImageFileSize(image, quality) {  // image must be a canvas
    return Math.floor(image.toDataURL("image/jpeg", quality).length * (3 / 4));
}

function qualityForSize(image, fileSize) {
    // These are approximations only
    // and are the result of using a test image and finding the file size
    // at quality setting 1 to 0.1 in 0.1 steps
    const scalingFactors = [
        5638850 / 5638850,
        1706816 / 5638850,
        1257233 / 5638850,
        844268 / 5638850,
        685253 / 5638850,
        531014 / 5638850,
        474293 / 5638850,
        363686 / 5638850,
        243578 / 5638850,
        121475 / 5638850,
        0, // this is added to catch the stuff ups.
    ]
    var size = getImageFileSize(image, 1); // get file size at best quality;
    if (size <= fileSize) { // best quality is a pass
        return 1;
    }
    // using size make a guess at the quality setting
    var index = 0;
    while (size * scalingFactors[index] > fileSize) {
        index += 1
    }
    if (index === 10) {  // Could not find a quality setting
        return 0; // this is bad and should not be used as a quality setting
    }
    var sizeUpper = size * scalingFactors[index - 1];  // get estimated size at upper quality
    var sizeLower = size * scalingFactors[index];  // get estimated size at lower quality
    // estimate quality via linear interpolation
    var quality = (1 - (index / 10)) + ((fileSize - sizeLower) / (sizeUpper - sizeLower)) * 0.1;
    var qualityStep = 0.02; // the change in quality (this value gets smaller each try)
    var numberTrys = 3;  //  number of trys to get as close as posible to the file size
    var passThreshold = 0.90; // be within 90% of desiered file size
    var passQualities = []; // array of quality settings that are under file size
    while (numberTrys--) {
        var newSize = getImageFileSize(image, quality); // get the file size for quality guess
        if (newSize <= fileSize && newSize / fileSize > passThreshold) { // does it pass?
            return quality;  // yes return quality
        }
        if (newSize > fileSize) {  // file size too big
            quality -= qualityStep;  // try lower quality
            qualityStep /= 2;        // reduce the quality step for next try
        } else {
            passQualities.push(quality);  // save this quality incase nothing get within the pass threashold
            quality += qualityStep;  // step the quality up.
            qualityStep /= 2;        // reduce the size of the next quality step
        }
    }
    // could not find a quality setting so get the best we did find
    if (passQualities.length > 0) { //check we did get a pass
        passQualities.sort();  // sort to get best pass quality
        return passQualities.pop(); // return best quality that passed
    }
    // still no good result so just default to next 0.1 step down
    return 1 - ((index + 1) / 10);
}

export const resize = (file, callback) => {
    // Ensure it's an image
    if (file.type.match(/image.*/)) {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {

            const image = new Image();
            image.onload = () => {
                let canvas = document.createElement('canvas'),
                    width = image.width / 3,
                    height = image.height / 3;

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
                    ctx.drawImage(image, 0, 0);
                    const qualitySetting = qualityForSize(canvas, 400000);   // find the image quality to be under file size 244000
                    const dataUrl = canvas.toDataURL('image/jpeg', qualitySetting);
                    const resizedImage = dataURLToBlob(dataUrl);

                    callback(resizedImage, dataUrl);
                });


            };
            image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
    }
};

class ImgUploaderAmazon extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            uploading: false
        };
        this.ref = React.createRef();
    }

    uploadImages = (arr, index) => {
        this.setState({uploading: true});
        resize(arr[index], img => {
            shopApi.uploadImage(img, this.props.token).then(res => {
                this.props.addImage('https://tedooo.s3.amazonaws.com/' + res.id);
                if (index === arr.length - 1) {
                    this.props.stopUpload();
                    this.setState({uploading: false});
                } else
                    this.uploadImages(arr, index + 1);
            }).catch(() => {
                this.props.stopUpload();
                this.setState({uploading: false});
            });
        });
    };

    onD = (accepted) => {
        if (accepted && accepted.length >= 1) {
            this.props.startUpload();
            this.uploadImages(accepted, 0);
        }
    };

    openUploadDialog = () => {
        this.ref.current.children[0].value = '';
        this.ref.current.children[0].click();
    };

    render() {
        let dropZone;

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
                    <Reorder
                        reorderId="my-list" // Unique ID that is used internally to track this list (required)
                        draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
                        component={SmallImageContainer}
                        lock="vertical" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
                        holdTime={500} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
                        onReorder={this.props.callback} // Callback when an item is dropped (you will need this to update your state)
                        autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
                        disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
                    >
                        {this.props.img_links.map((link, index) => (
                            <div key={index} style={{
                                width: 70, height: 70, position: 'relative',
                                marginLeft: index === 0 ? 0 : 5
                            }}>
                                <ImgWithLoader style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    pointerEvents: 'none'
                                }} src={link}/>
                                <Button onClick={() => {
                                    this.props.removeImage(index);
                                }} mini variant="fab" color="inherit" aria-label="add" classes={{
                                    root: this.props.classes.root
                                }}>
                                    <RemoveIcon style={{
                                        height: 20, width: 20, zIndex: 99
                                    }}/>
                                </Button>
                            </div>
                        ))}
                    </Reorder>
                    <div style={{
                        height: 70,
                        width: 70,
                        backgroundColor: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        marginLeft: this.props.img_links.length === 0 ? 0 : 5
                    }}>
                        {this.state.uploading ?
                            <RefreshIndicator style={{marginLeft: 10, alignSelf: 'center'}}/> :
                            <Button onClick={() => {
                                dropZone.open();
                            }} mini variant="fab" color="inherit" aria-label="add" classes={{
                                root: this.props.classes.root2
                            }}>
                                <AddIcon/>
                            </Button>}

                        }
                    </div>

                </div> : <TedooButton
                    clearBackground={'white'}
                    selected={false}
                    deselectedTextColor={'#3CBF95'}
                    onClick={() => {
                        dropZone.open();
                    }}
                    text={'Upload Images'} style={{
                    alignSelf: 'flex-end',
                    width: '30%',
                    marginRight: '41px'
                }}/>}
                <Dropzone style={{display: 'none'}} ref={dropArea => {
                    dropZone = dropArea
                }} onDrop={this.onD}/>
            </div>
        );
    }
}

export default withStyles(styles)(ImgUploaderAmazon);