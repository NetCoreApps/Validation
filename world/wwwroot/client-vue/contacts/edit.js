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
var shared_1 = require("../shared");
var dtos_1 = require("../../dtos");
var EditContact = /** @class */ (function (_super) {
    __extends(EditContact, _super);
    function EditContact() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loading = false;
        _this.valid = true;
        _this.id = 0;
        _this.title = "";
        _this.name = "";
        _this.color = "";
        _this.filmGenres = [];
        _this.age = 0;
        _this.responseStatus = null;
        return _this;
    }
    EditContact.prototype.mounted = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Object.assign(this, this.contact);
                return [2 /*return*/];
            });
        });
    };
    EditContact.prototype.concat = function (prefix, id, suffix) {
        return prefix + id + (suffix || '');
    };
    EditContact.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.loading = true;
                        request = new dtos_1.UpdateContact({
                            id: this.id,
                            title: this.title,
                            name: this.name,
                            color: this.color,
                            filmGenres: this.filmGenres,
                            age: this.age,
                        });
                        return [4 /*yield*/, shared_1.client.post(request)];
                    case 1:
                        _a.sent();
                        shared_1.redirect('../');
                        this.responseStatus = null;
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
    EditContact = __decorate([
        vue_property_decorator_1.Component({ template: "<div class=\"col-lg-4\">\n        <h3>Update Contact</h3>\n\n        <form @submit.prevent=\"submit\" @keyup.native.enter=\"submit\">\n            <ErrorSummary :responseStatus=\"responseStatus\" except=\"title,name,color,filmGenres,age\" />\n        \n            <div class=\"form-group\">\n                <Input type=\"radio\" id=\"title\" v-model=\"title\" :values=\"contactTitles\" :inline=\"true\" :responseStatus=\"responseStatus\" />\n            </div>\n            <div class=\"form-group\">\n                <Input id=\"name\" v-model=\"name\" placeholder=\"Name\" :responseStatus=\"responseStatus\"\n                       label=\"Full Name\" help=\"Your first and last name\" />                \n            </div>\n            <div class=\"form-group\">\n                <Select id=\"color\" v-model=\"color\" :values=\"contactColors\" label=\"Favorite color\" :responseStatus=\"responseStatus\" />\n            </div>\n            <div class=\"form-group\">\n                <Input type=\"checkbox\" id=\"filmGenres\" v-model=\"filmGenres\" :values=\"contactGenres\"\n                       label=\"Favorite Film Genres\" help=\"choose one or more\" :responseStatus=\"responseStatus\" />\n            </div>\n            <div class=\"form-group\">\n                <Input type=\"number\" id=\"age\" v-model=\"age\" inputClass=\"col-4\" placeholder=\"Age\" :responseStatus=\"responseStatus\" />\n            </div>\n            <div class=\"form-group\">\n                <button class=\"btn btn-primary\" type=\"submit\">Update Contact</button>\n                <a href=\"../\">cancel</a>\n            </div>\n        </form>\n    </div>",
            props: {
                redirect: String
            }
        })
    ], EditContact);
    return EditContact;
}(vue_property_decorator_1.Vue));
exports.EditContact = EditContact;
