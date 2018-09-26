import React from 'react';
import {Input} from "reactstrap";
import Collapse from "@material-ui/core/Collapse/Collapse";
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
const InfiniteFields = props => {
    const a = [];
    for (let i = 0; i < props.max_items; i++)
        a.push(0);
    return (
        <div style={props.style}>
            {a.map((_, index) =>
                <Collapse in={props.values.length > index} style={{marginLeft: 41}}>
                    <div style={{display: 'flex', flexDirection: 'row-reverse', marginTop: index > 0 ? 10 : 0}}>
                        <Button onClick={() => {
                            props.extend(index);
                        }} mini variant="fab" color="inherit" aria-label="add" classes={{
                            root: props.classes.root2
                        }} disabled={props.values.length === props.max_items}>
                            <AddIcon/>
                        </Button>

                        {(props.values.length > 1 || props.values[0].length > 0) &&
                        <Button onClick={() => {
                            props.remove(index);
                        }} mini variant="fab" color="inherit" aria-label="add" classes={{
                            root: props.classes.root2
                        }}>
                            <RemoveIcon/>
                        </Button>}

                        <Input className={'inputField'}
                               style={{
                                   borderRadius: 10,
                                   flex: 1,
                               }}
                               type={props.type || 'text'}
                               id={index}
                               onChange={e => {
                                   props.onChange(e.target.value, index);
                               }}
                               value={props.values[index]}
                               placeholder={props.placeholder}
                        />
                    </div>
                </Collapse>
            )}
        </div>
    );
};

export default withStyles(styles)(InfiniteFields);