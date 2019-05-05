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
var controls_1 = require("./controls");
var SignIn = function () {
    var _a = react_1.useContext(shared_1.StateContext), state = _a.state, dispatch = _a.dispatch;
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(null), responseStatus = _c[0], setResponseStatus = _c[1];
    var _d = react_1.useState(''), userName = _d[0], setUserName = _d[1];
    var _e = react_1.useState(''), password = _e[0], setPassword = _e[1];
    var _f = react_1.useState(true), rememberMe = _f[0], setRememberMe = _f[1];
    var switchUser = function (email) {
        setUserName(email);
        setPassword('p@55wOrd');
    };
    var submit = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    setResponseStatus(null);
                    return [4 /*yield*/, shared_1.client.post(new shared_1.Authenticate({
                            provider: 'credentials',
                            userName: userName,
                            password: password,
                            rememberMe: rememberMe,
                        }))];
                case 1:
                    response = _a.sent();
                    dispatch({ type: 'signin', data: response });
                    shared_1.redirect(shared_1.queryString(location.search)['redirect']);
                    return [3 /*break*/, 4];
                case 2:
                    e_1 = _a.sent();
                    setResponseStatus(e_1.responseStatus || e_1);
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "col-lg-4" },
        React.createElement("h3", null, "Sign In"),
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
                React.createElement(controls_1.ErrorSummary, { responseStatus: responseStatus, except: 'userName,password' })),
            React.createElement("div", { className: "form-group" },
                React.createElement(controls_1.Input, { type: "text", id: "userName", value: userName, onChange: setUserName, responseStatus: responseStatus, placeholder: "UserName", label: "Email", help: "Email you signed up with" })),
            React.createElement("div", { className: "form-group" },
                React.createElement(controls_1.Input, { type: "password", id: "password", value: password, onChange: setPassword, responseStatus: responseStatus, placeholder: "Password", label: "Password", help: "6 characters or more" })),
            React.createElement("div", { className: "form-group" },
                React.createElement(controls_1.CheckBox, { id: "rememberMe", value: rememberMe, onChange: setRememberMe, responseStatus: responseStatus }, "Remember Me")),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-lg btn-primary" }, "Login")),
            React.createElement("div", { className: "form-group" },
                React.createElement("a", { className: "btn btn-outline-primary", href: "/client-react/register" }, "Register New User"))),
        React.createElement("div", { className: "pt-3" },
            React.createElement("b", null, "Quick Login:"),
            React.createElement("p", { className: "pt-1" },
                React.createElement("a", { className: "btn btn-outline-info btn-sm", href: "javascript:void(0)", onClick: function () { return switchUser('admin@email.com'); } }, "admin@email.com"),
                " ",
                React.createElement("a", { className: "btn btn-outline-info btn-sm", href: "javascript:void(0)", onClick: function () { return switchUser('new@user.com'); } }, "new@user.com")))));
};
