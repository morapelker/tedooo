import React, {Component} from 'react';
import MediaTypeTest from "../specificShop/MediaTypeTest";

class Categories extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'red'
            }}>
                <MediaTypeTest />
            </div>
        );
    }
}

export default Categories;