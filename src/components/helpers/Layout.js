import React, {Component} from 'react';
import Reorder from 'react-reorder'

class Layout extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            images: [
                {name: 1},
                {name: 2},
                {name: 3},
                {name: 4},
                {name: 5}
            ]
        };
    }

    itemClicked = (...vals) => {
        console.log('itemClicked', vals);
    };

    callBack = (_, from, to) => {
        const a = this.state.images;
        const tmpImage = this.state.images[from];
        a.splice(from, 1);
        a.splice(to, 0, tmpImage);
        this.setState({images: a});
    };

    mouseDown = () => {
        console.log('mouse down');
    };

    mouseUp = () => {
        console.log('mouse up');
    };

    render() {
        return (
            <div style={{
                width: '100%',
                height: '100%',
            }} onMouseUp={this.mouseUp}>
                <Reorder
                    reorderId="my-list" // Unique ID that is used internally to track this list (required)
                    draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
                    lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
                    holdTime={500} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
                    touchHoldTime={500} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
                    mouseHoldTime={200} // Hold time before dragging begins with mouse (optional), defaults to holdTime
                    onReorder={this.callBack} // Callback when an item is dropped (you will need this to update your state)
                    autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
                    disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
                >
                    {this.state.images.map((item) => (
                        <div
                            onMouseDown={this.mouseDown}
                            style={{
                                height: 40,
                                width: 40,
                                backgroundColor: 'blue',
                            }}
                            key={item.name}>
                            {item.name}
                        </div>
                    ))}
                </Reorder>
            </div>
        );
    }
}

export default Layout;