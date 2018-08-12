import React from 'react';
import {Form, Input} from "reactstrap";
import './commonCss.css'
import AutoCompleteField from "./AutoCompleteField";
import Collapse from "@material-ui/core/Collapse/Collapse";
import Button from "@material-ui/core/Button/Button";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import withStyles from "@material-ui/core/styles/withStyles";
import ApiAutoCompleteField from "./ApiAutoCompleteField";

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

const renderField = (field, index, props) => (
    <div>
        {field.type === 'select' ?
            <div
                style={{
                    marginRight: props.fromAddShop ? 41 : 'unset',
                    marginLeft: props.fromAddShop ? 41 : 'unset',
                }}>
                {field.api ?
                    <ApiAutoCompleteField
                        value={field.value || ''}
                        placeholder={field.placeholder}
                        suggestions={field.suggestions}
                        id={index}
                        name={index}
                        onBlur={field.onBlur}
                        onChange={field.selector}/>
                    :
                <AutoCompleteField
                    value={field.value || ''}
                    placeholder={field.placeholder}
                    suggestions={field.suggestions}
                    id={index}
                    name={index}
                    onBlur={field.onBlur}
                    onChange={field.selector}/>}
            </div>
            :
            <div style={{display: 'flex', flexDirection: 'row-reverse',
                marginLeft: props.fromAddShop ? 41 : 'unset'
            }}>
                {props.fromAddShop &&
                <Button onClick={() => {
                    props.onExtend(index);
                }} mini variant="fab" color="inherit" aria-label="add" classes={{
                    root: props.classes.root2
                }} style={{
                    visibility: field.expandable === undefined ? 'hidden' : 'visible'
                }} disabled={!field.expandable}>
                    <AddIcon/>
                </Button>}

                {field.minorable &&
                props.fromAddShop &&
                <Button onClick={() => {
                    props.onMinor(index);
                }} mini variant="fab" color="inherit" aria-label="remove" classes={{
                    root: props.classes.root
                }}>
                    <RemoveIcon/>
                </Button>}
                <Input className={'inputField'}
                       style={{
                           borderRadius: 10,
                           flex: 1
                       }}
                       type={field.type || 'text'}
                       id={index}
                       value={field.value || ''}
                       onChange={props.textChanged}
                       placeholder={field.placeholder}
                       onKeyPress={e => {
                           if (e.key === 'Enter' && props.enterClicked !== undefined) {
                               props.enterClicked();
                           }
                       }}
                       name={index}
                />
            </div>
        }
        <p/>
    </div>
);

const TextFieldContainer = (props) => {
    return (
        <Form>
            {props.fields.map((field, index) => {
                if (field.hidden !== undefined) {
                    return (<Collapse in={!field.hidden} key={index}>
                        {renderField(field, index, props)}
                    </Collapse>);
                } else {
                    return (<div key={index}>
                        {renderField(field, index, props)}
                    </div>);
                }
            })}
        </Form>
    );
};

export default withStyles(styles)(TextFieldContainer);