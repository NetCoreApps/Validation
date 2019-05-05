"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = require("vue-property-decorator");
var shared_1 = require("./shared");
var SignIn = /** @class */ (function (_super) {
    __extends(SignIn, _super);
    function SignIn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userName = '';
        _this.password = '';
        _this.rememberMe = true;
        _this.loading = false;
        _this.responseStatus = null;
        return _this;
    }
    SignIn.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.loading = true;
                        this.responseStatus = null;
                        return [4 /*yield*/, shared_1.client.post(new shared_1.Authenticate({
                                provider: 'credentials',
                                userName: this.userName,
                                password: this.password,
                                rememberMe: this.rememberMe,
                            }))];
                    case 1:
                        response = _a.sent();
                        shared_1.bus.$emit('signin', response);
                        shared_1.redirect(shared_1.queryString(location.search)['redirect']);
                        return [3 /*break*/, 4];
                    case 2:
                        e_1 = _a.sent();
                        this.responseStatus = e_1.responseStatus || e_1;
                        return [3 /*break*/, 4];
                    case 3:
                        this.loading = false;
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SignIn.prototype.switchUser = function (email) {
        this.userName = email;
        this.password = 'p@55wOrd';
    };
    SignIn = __decorate([
        vue_property_decorator_1.Component({ template: "<div class=\"col-lg-4\">\n        <h3>Sign In</h3>\n        \n        <form ref=\"form\" @submit.prevent=\"submit\" :class=\"{ error:responseStatus, loading }\" >\n            <div class=\"form-group\">\n                <ErrorSummary except=\"userName,password\" :responseStatus=\"responseStatus\" />\n            </div>\n            <div class=\"form-group\">\n                <Input id=\"userName\" v-model=\"userName\" placeholder=\"Username\" :responseStatus=\"responseStatus\" \n                       label=\"Email\"  help=\"Email you signed up with\" />\n            </div>\n            <div class=\"form-group\">\n                <Input type=\"password\" id=\"password\" v-model=\"password\" placeholder=\"Password\" :responseStatus=\"responseStatus\" \n                       label=\"Password\"  help=\"6 characters or more\" />\n            </div>\n            <div class=\"form-group\">\n                <CheckBox id=\"rememberMe\" v-model=\"rememberMe\" :responseStatus=\"responseStatus\">\n                    Remember Me\n                </CheckBox>\n            </div>\n            <div class=\"form-group\">\n                <button type=\"submit\" class=\"btn btn-lg btn-primary\">Login</button>\n            </div>\n            <div class=\"form-group\">\n                <a class=\"btn btn-outline-primary\" href=\"/client-vue/register\">Register New User</a>\n            </div>\n        </form>\n        \n        <div class=\"pt-3\">\n            <b>Quick Login:</b>\n            <p class=\"pt-1\">\n                <a class=\"btn btn-outline-info btn-sm\" href=\"javascript:void(0)\" @click.prevent=\"switchUser('admin@email.com')\">admin@email.com</a>\n                <a class=\"btn btn-outline-info btn-sm\" href=\"javascript:void(0)\" @click.prevent=\"switchUser('new@user.com')\">new@user.com</a>\n            </p>\n        </div>\n    </div>"
        })
    ], SignIn);
    return SignIn;
}(vue_property_decorator_1.Vue));
exports.SignIn = SignIn;
