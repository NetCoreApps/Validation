"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classNames = require("classnames");
var react_1 = require("react");
var shared_1 = require("./shared");
var react_2 = require("@servicestack/react");
var SignUp = function () {
    var _a = react_1.useContext(shared_1.StateContext), state = _a.state, dispatch = _a.dispatch;
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(null), responseStatus = _c[0], setResponseStatus = _c[1];
    var _d = react_1.useState(''), displayName = _d[0], setDisplayName = _d[1];
    var _e = react_1.useState(''), email = _e[0], setEmail = _e[1];
    var _f = react_1.useState(''), password = _f[0], setPassword = _f[1];
    var _g = react_1.useState(''), confirmPassword = _g[0], setConfirmPassword = _g[1];
    var _h = react_1.useState(true), autoLogin = _h[0], setAutoLogin = _h[1];
    var newUser = function (email) {
        var names = email.split('@');
        setDisplayName(shared_1.toPascalCase(names[0]) + " " + shared_1.toPascalCase(shared_1.splitOnFirst(names[1], '.')[0]));
        setEmail(email);
        setPassword('p@55wOrd');
        setConfirmPassword('p@55wOrd');
    };
    var submit = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    setLoading(true);
                    setResponseStatus(null);
                    return [4 /*yield*/, shared_1.client.post(new shared_1.Register({
                            displayName: displayName,
                            email: email,
                            password: password,
                            confirmPassword: confirmPassword,
                            autoLogin: autoLogin,
                        }))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, shared_1.checkAuth(dispatch)];
                case 2:
                    _a.sent();
                    shared_1.redirect('/client-react/');
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _a.sent();
                    setResponseStatus(e_1.responseStatus || e_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "col-lg-5" },
        React.createElement("h3", null, "Register New User"),
        React.createElement("form", { className: classNames({ error: responseStatus, loading: loading }), onSubmit: function (e) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        return [4 /*yield*/, submit()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            }); }); } },
            React.createElement("div", { className: "form-group" },
                React.createElement(react_2.ErrorSummary, { except: 'displayName,email,password,confirmPassword', responseStatus: responseStatus })),
            React.createElement("div", { className: "form-group" },
                React.createElement(react_2.Input, { type: "text", id: "displayName", value: displayName, onChange: setDisplayName, responseStatus: responseStatus, placeholder: "Display Name", label: "Name", help: "Your first and last name" })),
            React.createElement("div", { className: "form-group" },
                React.createElement(react_2.Input, { type: "text", id: "email", value: email, onChange: setEmail, responseStatus: responseStatus, placeholder: "Email", label: "Email" })),
            React.createElement("div", { className: "form-group" },
                React.createElement(react_2.Input, { type: "password", id: "password", value: password, onChange: setPassword, responseStatus: responseStatus, placeholder: "Password", label: "Password" })),
            React.createElement("div", { className: "form-group" },
                React.createElement(react_2.Input, { type: "password", id: "confirmPassword", value: confirmPassword, onChange: setConfirmPassword, responseStatus: responseStatus, placeholder: "Confirm", label: "Confirm Password" })),
            React.createElement("div", { className: "form-group" },
                React.createElement(react_2.CheckBox, { id: "autoLogin", value: autoLogin, onChange: setAutoLogin, responseStatus: responseStatus }, "Auto Login")),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { className: "btn btn-lg btn-primary", type: "submit" }, "Register")),
            React.createElement("div", { className: "pt-3" },
                React.createElement("b", null, "Quick Populate:"),
                React.createElement("p", { className: "pt-1" },
                    React.createElement("a", { className: "btn btn-outline-info btn-sm", href: "javascript:void(0)", onClick: function () { return newUser('new@user.com'); } }, "new@user.com"))))));
};
