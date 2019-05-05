import * as React from 'react';
import * as classNames from "classnames";
import { client, ResponseStatus, errorResponse, errorResponseExcept } from './shared'
import {ChangeEvent} from "react";

interface ErrorSummaryProps {
    responseStatus: any,
    except: string | string[]
}
export const ErrorSummary: React.FC<ErrorSummaryProps> = ({ responseStatus, except }) => {
    const self = { responseStatus };
    const errorSummary = errorResponseExcept.call(self,except);
    return (errorSummary ? <div className="alert alert-danger mt-2">{errorSummary}</div> : null);
};

interface InputPropsBase {
    responseStatus?: any,
    type?: string,
    id?: string;
    placeholder?: string;
    label?: string;
    help?: string;
    inline?: boolean;
    onChange?: (value:any) => void;
}

interface InputProps extends InputPropsBase {
    type?: string;
    value?: string[]|string;
    values?: any[];
    inputClass?: string;
}

export const Input: React.FC<InputProps> = (props) => {
    let { 
        responseStatus, 
        type, 
        id,
        placeholder,
        label,
        help,
        inputClass,
        inline,
        value,
        values,
        onChange,
        ...remaining 
    } = props;

    if (!type) type = 'text';
    if (!inputClass) inputClass = 'form-control-lg';
    
    const isCheck = type == 'radio' || type == 'checkbox';;
    const self = { responseStatus };
    const errorField = id && errorResponse.call(self,id);
    const hasError = !!errorField;
    const fn = onChange;
    
    const kvpValues = (values || []).map(x => typeof x == 'string'
        ? { key: x, value: x }
        : x);

    const onInput = (e:InputEvent) => { if (fn) fn(e.target.value); };
    
    const onInputValues = (e:InputEvent) => { if (fn) fn(inputSelectedValues(e.target)); };

    const hasValue = (elValue:string) => {
        return type == 'checkbox'
            ? (value instanceof Array
                ? value.indexOf(elValue) >= 0
                : false)
            : value == elValue;
    };

    return (<div>
        {label ? <label className={isCheck ? 'form-check-label' : 'form-label'} htmlFor={id}>{label}</label> : null}
        {isCheck ?
            (<div className={classNames('form-check',{'is-invalid':hasError,'form-control':hasError})}>
                {type == 'radio' ?
                    kvpValues.map((kvp:any) => 
                        (<div key={`${id}-${kvp.key}`} className={classNames('custom-control','custom-radio',{'custom-control-inline':inline})}>
                            <input type="radio" id={`${id}-${kvp.key}`} name={id} value={kvp.key}
                                   className={classNames('custom-control-input',inputClass)} checked={value==kvp.key}
                                   onChange={onInput} />
                            <label className="custom-control-label" htmlFor={`${id}-${kvp.key}`}>{kvp.value}</label>
                        </div>)) : null}
                {type == 'checkbox' ?
                    kvpValues.map((kvp:any) => 
                        (<div key={`${id}-${kvp.key}`} className={classNames('custom-control','custom-checkbox',{'custom-control-inline':inline})}>
                            <input type="checkbox" id={`${id}-${kvp.key}`} name={id} value={kvp.key}
                                   className="form-check-input" checked={hasValue(kvp.key)} onChange={onInputValues} />
                            <label className="form-check-label" htmlFor={`${id}-${kvp.key}`}>{kvp.value}</label>
                        </div>)) : null}
                {help ? <small className="text-muted">{help}</small> : null}
            </div>)
            : null}
        {!isCheck ? <input type={type} id={id} name={id} value={value}
           className={classNames('form-control',{'is-invalid':errorField}, inputClass)}
           onChange={e => { if (fn) fn(e.target.value); }} placeholder={placeholder}
           {...remaining} /> : null}
        {!isCheck && help ? <small className="text-muted">{help}</small> : null}
        {errorField ? <div className="invalid-feedback">{errorField}</div> : null}
    </div>);

    function inputSelectedValues(input:HTMLInputElement) {
        if (input.form == null)
            throw new Error("multiple values must be within a <form> element");

        let selectedValues = [];
        let elements = input.form.elements;
        for (let i = 0; i<elements.length; i++) {
            let el = elements[i] as HTMLInputElement;
            if (el.name == input.name && el.checked) {
                selectedValues.push(el.value);
            }
        }
        return selectedValues;
    }
};


interface SelectProps extends InputPropsBase {
    selectClass?: string;
    multiple?: boolean;
    value?: string[]|string;
    values?: any[];
}

export const Select: React.FC<SelectProps> = (props) => {
    const { responseStatus, id, label, help, selectClass, multiple, value, values, onChange } = props;
    const self = { responseStatus };
    const errorField = id && errorResponse.call(self,id);
    const hasError = !!errorField;

    const kvpValues = (values || []).map(x => typeof x == 'string'
        ? { key: x, value: x }
        : x);

    const hasValue = (elValue:string) => {
        return multiple
            ? (value instanceof Array
                ? value.indexOf(elValue) >= 0
                : false)
            : value == elValue;
    };

    const fn = onChange;

    const onInputValues = (e:ChangeEvent<HTMLSelectElement>) => { if (fn) fn(multiple ? selectedOptions(e.target as any as HTMLSelectElement) : e.target.value); };

    return (<div>
        {label ? <label className="form-label" htmlFor={id}>{label}</label> : null}
        <select id={id} name={id} className={classNames('form-control',{'is-invalid':errorField}, selectClass)}
                multiple={multiple} value={value} onChange={onInputValues}>
            {kvpValues.map((kvp:any) =>
                (<option key={kvp.key} value={kvp.key}>{kvp.value}</option>))}
        </select>
        {help ? <small className="text-muted">{help}</small> : null}
        {errorField ? <div className="invalid-feedback">{errorField}</div> : null}
    </div>);
};

function selectedOptions(select:HTMLSelectElement) {
    let selectedValues = [];
    for (let i = 0; i<select.options.length; i++) {
        if (select.options[i].selected) {
            selectedValues.push(select.options[i].value);
        }
    }
    return selectedValues;
}


interface CheckBoxProps extends InputPropsBase {
    value?: boolean
    inputClass?: string;
}

export const CheckBox: React.FC<CheckBoxProps> = (props) => {
    const { responseStatus, id, value, help, onChange, inputClass } = props;
    const self = { responseStatus };
    const errorField = id && errorResponse.call(self,id);
    const fn = onChange;

    const onInput = (e:InputEvent) => { if (fn) fn(e.target.checked); };

    return (<div>
            <div className={classNames('form-check',{'is-invalid':errorField,'form-control':errorField})}>
                <input type="checkbox" id={id} name={id} onChange={onInput} checked={value} value="true"
                       className={classNames('form-check-input',{'is-invalid':errorField},inputClass)} />
                <label className="form-check-label" htmlFor={id}>{props.children}</label>
            </div>
            {help ? <small className="text-muted">{help}</small> : null}
            {errorField ? <div className="invalid-feedback">{errorField}</div> : null}
        </div>);
};
