import React, {Component} from 'react';

import './SpecificShop.css';
import ImgWithLoader from "../common/ImgWithLoader";

const maxSmallImages = 6;

class ImageColumn extends Component {
    constructor(props, context) {
        super(props, context);
        const bigImgUrl = (this.props.shop.img_links && this.props.shop.img_links.length > 0) ? this.props.shop.img_links[0] : '';
        this.state = {
            bigImgUrl,
            startIndex: 0
        }
    }

    componentWillReceiveProps(props, context) {
        const bigImgUrl = (props.shop.img_links && props.shop.img_links.length > 0) ? props.shop.img_links[0] : '';
        this.setState({bigImgUrl});
    }

    render() {
        return (
            <div style={{
                width: '50%',
                maxHeight: 70 * maxSmallImages,
                display: 'flex',
                paddingTop: 50
            }}>
                <div style={{
                    display: 'flex',
                    paddingRight: 20,
                    paddingLeft: 20,
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    {this.props.shop.img_links.map((link, index) => {
                        if (index >= this.state.startIndex && index < this.state.startIndex + maxSmallImages) {
                            return <ImgWithLoader key={index} style={{
                                width: 60,
                                height: 60,
                                marginTop: (index === this.state.startIndex ? 0 : 10),
                                borderRadius: 10,
                                border: '1px black solid',
                                marginLeft: 12,
                                objectFit: 'cover',
                                borderWidth: 3,
                                cursor: 'pointer',
                                borderColor: (this.state.bigImgUrl === link ? '#3CBF95' : 'black')
                            }} src={link}
                                                  otherProps={{
                                                      onDragStart: e => {
                                                          e.preventDefault();
                                                      }, onClick: () => {
                                                          this.setState({
                                                              bigImgUrl: link
                                                          });
                                                      }
                                                  }}/>
                        }
                        return undefined;
                    })}
                </div>
                <ImgWithLoader
                    style={{flexShrink: 1, objectFit: 'contain', maxHeight: 400, overflow: 'hidden'}}
                    src={this.state.bigImgUrl}/>
            </div>
        );
    }
}

export default ImageColumn;