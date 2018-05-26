import React from 'react';
import {Form, Input} from "reactstrap";
import './commonCss.css'
import AutoCompleteField from "./AutoCompleteField";

const TextFieldContainer = (props) => {
    return (
        <Form>
            {props.fields.map((field, index) => (
                <div key={index}>
                    {field.type === 'select' ?
                        <AutoCompleteField
                            value={field.value || ''}
                            placeholder={field.placeholder}
                            suggestions={field.suggestions}
                            id={field.name}
                            name={field.name}
                            onChange={field.selector}/>
                        :
                        <Input className={'inputField'}
                               style={{
                                   borderRadius: 10,
                               }}
                               type={field.type || 'text'}
                               id={field.name}
                               value={field.value || ''}
                               onChange={props.textChanged}
                               placeholder={field.placeholder}
                               onKeyPress={e=>{
                                   if (e.key === 'Enter' && props.enterClicked !== undefined) {
                                       props.enterClicked();
                                   }
                               }}
                               name={field.name}
                        />
                    }
                    <p/>
                </div>
            ))}
        </Form>
    );
};

export default TextFieldContainer;