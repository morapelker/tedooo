import React, {Component} from 'react';
import {Input} from "reactstrap";
import './transitionCss.css';
import Button from "@material-ui/core/Button/Button";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    root: {
        height: 25,
        width: 25,
        minHeight: 0,
        minWidth: 0,
        margin: theme.spacing.unit,
        backgroundColor: 'white',
        color: '#3CBF95'
    }, root2: {
        height: 25,
        width: 25,
        minHeight: 0,
        minWidth: 0,
        margin: theme.spacing.unit,
        backgroundColor: 'white',
        color: '#3CBF95'
    }
});


class ContactField extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            didMount: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({didMount: true});
        }, 0);
    }

    render() {
        const {didMount} = this.state;
        return (
            <div
                className={`fade-in ${didMount && 'visible'}`}
                style={{width: '100%', display: 'flex', marginTop: 10}}>
                <Input className={'inputField'}
                       style={{
                           borderRadius: 10,
                           flex: 1,
                       }}
                       type={this.props.type || 'text'}
                       value={this.props.value || ''}
                       onChange={this.props.changeSelector}
                       placeholder={this.props.placeholder}
                       onKeyPress={e => {
                           if (e.key === 'Enter' && this.props.enterClicked !== undefined) {
                               this.props.enterClicked();
                           }
                       }}
                />
                <Button onClick={this.props.addSelector} mini variant="fab" color="inherit" aria-label="add" classes={{
                    root: this.props.classes.root2
                }}>
                    <AddIcon/>
                </Button>

                {this.props.withRemove &&
                <Button onClick={this.props.removeSelector} mini variant="fab" color="inherit" aria-label="remove" classes={{
                    root: this.props.classes.root
                }}>
                    <RemoveIcon/>
                </Button>}
            </div>
        );
    }
}

export default withStyles(styles)(ContactField);