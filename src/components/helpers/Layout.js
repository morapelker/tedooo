import React, {Component} from 'react';
import MediaQuery from "react-responsive";

class Layout extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <div style={{
                backgroundColor: 'red',
                width: '100%',
                height: '100%',
            }}>
                <MediaQuery query="(max-width: 800px)">
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            backgroundColor: 'blue',
                            flex: 3,
                            width: '100%'
                        }}>
                            <img style={{
                                backgroundColor: 'green',
                                width: '100%',
                                height: '100%',
                                objectFit:'contain',
                            }} alt={''} src={'https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2F08F9266E-C07F-4278-930D-03572F416583.png?alt=media&token=31e14435-e158-4e34-baad-61d87f8029fc'} />
                        </div>
                        <div style={{
                            backgroundColor: 'yellow',
                            flex: 1,
                            width: '100%'
                        }}>
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery query="(min-width: 801px)">
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex'
                    }}>
                        <div style={{
                            backgroundColor: 'blue',
                            flex: 3,
                            height: '90%'
                        }}>
                            {/*<img style={{*/}
                                {/*backgroundColor: 'green',*/}
                                {/*width: '100%',*/}
                                {/*height: '100%',*/}
                                {/*objectFit:'contain',*/}
                            {/*}} alt={''} src={'https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2F08F9266E-C07F-4278-930D-03572F416583.png?alt=media&token=31e14435-e158-4e34-baad-61d87f8029fc'} />*/}
                        </div>
                        <div style={{
                            backgroundColor: 'yellow',
                            flex: 1,
                            height: '90%'
                        }}>
                        </div>
                    </div>
                </MediaQuery>


            </div>
        );
    }
}

export default Layout;