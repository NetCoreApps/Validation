"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classNames = require("classnames");
var shared_1 = require("../shared");
exports.ErrorSummary = function (_a) {
    var responseStatus = _a.responseStatus, except = _a.except;
    var self = { responseStatus: responseStatus };
    var errorSummary = shared_1.errorResponseExcept.call(self, except);
    return (errorSummary ? <div className="alert alert-danger mt-2">{errorSummary}</div> : null);
};
exports.Input = function (props) {
    var responseStatus = props.responseStatus, type = props.type, name = props.name, value = props.value, onChange = props.onChange, className = props.className, placeholder = props.placeholder, remaining = __rest(props, ["responseStatus", "type", "name", "value", "onChange", "className", "placeholder"]);
    var self = { responseStatus: responseStatus };
    var errorField = name && shared_1.errorResponse.call(self, name);
    var fn = onChange;
    return (<>
        <input type={type || 'text'} name={name} value={value} className={classNames('form-control', { 'is-invalid': errorField }, className || 'form-control-lg')} onChange={function (e) { if (fn)
        fn(e.target.value); }} placeholder={placeholder} {...remaining}/>
        {errorField ? <div className="invalid-feedback">{errorField}</div> : null}
    </>);
};
exports.CheckBox = function (props) {
    var responseStatus = props.responseStatus, name = props.name, checked = props.checked, onChange = props.onChange, className = props.className;
    var self = { responseStatus: responseStatus };
    var errorField = name && shared_1.errorResponse.call(self, name);
    var fn = onChange;
    return (<><div className={classNames('form-check', { 'is-invalid': errorField, 'form-control': errorField })}>
        <input type="checkbox" id={name} name={name} checked={checked} value="true" className={classNames('form-check-input', { 'is-invalid': errorField }, className || '')} onChange={function (e) { if (fn)
        fn(e.target.checked); }}/>
        {" "}
        <label className="form-check-label" htmlFor={name}>{props.children}</label>
    </div>
    {errorField ? <div className="invalid-feedback">{errorField}</div> : null}
    </>);
};
