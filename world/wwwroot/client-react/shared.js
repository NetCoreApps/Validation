"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var react_1 = require("react");
var client_1 = require("@servicestack/client");
exports.client = new client_1.JsonServiceClient("/");
var client_2 = require("@servicestack/client");
exports.errorResponse = client_2.errorResponse;
exports.errorResponseExcept = client_2.errorResponseExcept;
exports.splitOnFirst = client_2.splitOnFirst;
exports.toPascalCase = client_2.toPascalCase;
exports.queryString = client_2.queryString;
var dtos_1 = require("../dtos");
exports.ResponseStatus = dtos_1.ResponseStatus;
exports.ResponseError = dtos_1.ResponseError;
exports.Authenticate = dtos_1.Authenticate;
exports.AuthenticateResponse = dtos_1.AuthenticateResponse;
exports.Register = dtos_1.Register;
var dtos_2 = require("../dtos");
var initialState = {
    isAuthenticated: false,
    userSession: null
};
var reducer = function (state, action) {
    switch (action.type) {
        case 'signin':
            return __assign({}, state, { isAuthenticated: true, userSession: action.data });
        case 'signout':
            return __assign({}, state, { isAuthenticated: false, userSession: null });
        default:
            throw new Error();
    }
};
exports.StateContext = react_1.createContext({});
exports.StateProvider = function (props) {
    var _a = react_1.useReducer(reducer, initialState), state = _a[0], dispatch = _a[1];
    return (React.createElement(exports.StateContext.Provider, { value: { state: state, dispatch: dispatch } }, props.children));
};
exports.redirect = function (url) { return location.href = url || '/client-react/'; };
exports.checkAuth = function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b, e_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = dispatch;
                _b = { type: 'signin' };
                return [4 /*yield*/, exports.client.post(new dtos_2.Authenticate())];
            case 1:
                _a.apply(void 0, [(_b.data = _c.sent(), _b)]);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _c.sent();
                dispatch({ type: 'signout' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.signout = function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dispatch({ type: 'signout' });
                return [4 /*yield*/, exports.client.post(new dtos_2.Authenticate({ provider: "logout" }))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
