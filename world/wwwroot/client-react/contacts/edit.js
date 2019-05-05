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
var react_1 = require("react");
var shared_1 = require("../shared");
var controls_1 = require("../controls");
var dtos_1 = require("../../dtos");
var EditContact = function (_a) {
    var contact = _a.contact, contactTitles = _a.contactTitles, contactColors = _a.contactColors, contactGenres = _a.contactGenres;
    var _b = react_1.useContext(shared_1.StateContext), state = _b.state, dispatch = _b.dispatch;
    var _c = react_1.useState(false), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(null), responseStatus = _d[0], setResponseStatus = _d[1];
    var _e = react_1.useState(contact.id), id = _e[0], setId = _e[1];
    var _f = react_1.useState(contact.title), title = _f[0], setTitle = _f[1];
    var _g = react_1.useState(contact.name), name = _g[0], setName = _g[1];
    var _h = react_1.useState(contact.color), color = _h[0], setColor = _h[1];
    var _j = react_1.useState(contact.filmGenres), filmGenres = _j[0], setFilmGenres = _j[1];
    var _k = react_1.useState(contact.age), age = _k[0], setAge = _k[1];
    function submit() {
        return __awaiter(this, void 0, void 0, function () {
            var request, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setLoading(true);
                        request = new dtos_1.UpdateContact({
                            id: id,
                            title: title,
                            name: name,
                            color: color,
                            filmGenres: filmGenres,
                            age: age,
                        });
                        return [4 /*yield*/, shared_1.client.post(request)];
                    case 1:
                        _a.sent();
                        shared_1.redirect('../');
                        setResponseStatus(null);
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
        });
    }
    return (React.createElement("div", { className: "col-lg-4" },
        React.createElement("h3", null, "Update Contact"),
        React.createElement("form", { onSubmit: function (e) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        return [4 /*yield*/, submit()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            }); }); } },
            React.createElement(controls_1.ErrorSummary, { except: "title,name,color,filmGenres,age", responseStatus: responseStatus }),
            React.createElement("div", { className: "form-group" },
                React.createElement(controls_1.Input, { type: "radio", id: "title", value: title, onChange: setTitle, values: contactTitles, inline: true, responseStatus: responseStatus })),
            React.createElement("div", { className: "form-group" },
                React.createElement(controls_1.Input, { id: "name", value: name, onChange: setName, placeholder: "Name", responseStatus: responseStatus, label: "Full Name", help: "Your first and last name" })),
            React.createElement("div", { className: "form-group" },
                React.createElement(controls_1.Select, { id: "color", value: color, onChange: setColor, values: contactColors, label: "Favorite color", responseStatus: responseStatus })),
            React.createElement("div", { className: "form-group" },
                React.createElement(controls_1.Input, { type: "checkbox", id: "filmGenres", value: filmGenres, onChange: setFilmGenres, values: contactGenres, label: "Favorite Film Genres", help: "choose one or more", responseStatus: responseStatus })),
            React.createElement("div", { className: "form-group" },
                React.createElement(controls_1.Input, { type: "number", id: "age", value: age, onChange: function (x) { return setAge(Number(x)); }, inputClass: "col-4", placeholder: "Age", responseStatus: responseStatus })),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { className: "btn btn-primary", type: "submit" }, "Update Contact"),
                " ",
                React.createElement("a", { href: "../" }, "cancel")))));
};
