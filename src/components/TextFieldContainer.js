import React from 'react';
import {Form, Input} from "reactstrap";

const TextFieldContainer = (props) => {
    return (
        <Form>
            {props.fields.map((field, index) => (
                <div key={index}>
                    <Input
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
                    <p/>
                </div>
            ))}
        </Form>
    );
};

export default TextFieldContainer;