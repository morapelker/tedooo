import React, {Component} from 'react';
import ContactField from "./ContactField";

class InfiniteFields extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            values: ['']
        };
    }

    addClicked = index => {
        const values = this.state.values;
        values.splice(index + 1, 0, '');
        this.setState({values});
    };

    removeClicked = index => {
        const values = this.state.values;
        values.splice(index, 1);
        this.setState({values});
    };

    onChange = (value, index) => {
        const values = this.state.values;
        values[index] = value;
        this.setState({
            values
        });
    };

    render() {
        return (
            <div style={{width: '100%'}}>
                {this.state.values.map((value, index) => <ContactField
                    key={index}
                    value={value}
                    changeSelector={e => {
                        this.onChange(e.target.value, index)
                    }}
                    addSelector={() => {
                        this.addClicked(index);
                    }}
                    removeSelector={() => {
                        this.removeClicked(index);
                    }}
                    withRemove={this.state.values.length > 1}
                />)}
            </div>
        );
    }
}

export default InfiniteFields;