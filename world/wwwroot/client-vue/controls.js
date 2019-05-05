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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_property_decorator_1 = require("vue-property-decorator");
var shared_1 = require("./shared");
var ErrorSummary = /** @class */ (function (_super) {
    __extends(ErrorSummary, _super);
    function ErrorSummary() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ErrorSummary.prototype, "errorSummary", {
        get: function () { return shared_1.errorResponseExcept.call(this.$props, this.except); },
        enumerable: true,
        configurable: true
    });
    __decorate([
        vue_property_decorator_1.Prop({ default: null }),
        __metadata("design:type", Object)
    ], ErrorSummary.prototype, "responseStatus", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], ErrorSummary.prototype, "except", void 0);
    ErrorSummary = __decorate([
        vue_property_decorator_1.Component({ template: "<div v-if=\"errorSummary\" class=\"alert alert-danger mt-2\">{{errorSummary}}</div>" })
    ], ErrorSummary);
    return ErrorSummary;
}(vue_property_decorator_1.Vue));
exports.ErrorSummary = ErrorSummary;
vue_property_decorator_1.Vue.component('ErrorSummary', ErrorSummary);
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Input.prototype.concat = function (prefix, id, suffix) { return prefix + id + (suffix || ''); };
    Object.defineProperty(Input.prototype, "isCheck", {
        get: function () { return this.type == 'radio' || this.type == 'checkbox'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "errorField", {
        get: function () { return shared_1.errorResponse.call(this.$props, this.id); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "hasError", {
        get: function () { return !!this.errorField; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "kvpValues", {
        get: function () {
            var kvps = (this.values || []).map(function (x) { return typeof x == 'string'
                ? { key: x, value: x }
                : x; });
            return kvps;
        },
        enumerable: true,
        configurable: true
    });
    Input.prototype.onInput = function (e) { return e.target.value; };
    Input.prototype.onInputValues = function (e) { return inputSelectedValues(e.target); };
    Input.prototype.hasValue = function (elValue) {
        return this.type == 'checkbox'
            ? (this.value instanceof Array
                ? this.value.indexOf(elValue) >= 0
                : false)
            : this.value == elValue;
    };
    __decorate([
        vue_property_decorator_1.Prop({ default: null }),
        __metadata("design:type", Object)
    ], Input.prototype, "responseStatus", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: 'text' }),
        __metadata("design:type", String)
    ], Input.prototype, "type", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], Input.prototype, "id", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], Input.prototype, "placeholder", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], Input.prototype, "model", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], Input.prototype, "label", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], Input.prototype, "help", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: 'form-control-lg' }),
        __metadata("design:type", String)
    ], Input.prototype, "inputClass", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: false }),
        __metadata("design:type", Boolean)
    ], Input.prototype, "inline", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: function () { return null; } }),
        __metadata("design:type", Object)
    ], Input.prototype, "value", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: function () { return []; } }),
        __metadata("design:type", Array)
    ], Input.prototype, "values", void 0);
    __decorate([
        vue_property_decorator_1.Emit('input'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [InputEvent]),
        __metadata("design:returntype", void 0)
    ], Input.prototype, "onInput", null);
    __decorate([
        vue_property_decorator_1.Emit('input'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [InputEvent]),
        __metadata("design:returntype", void 0)
    ], Input.prototype, "onInputValues", null);
    Input = __decorate([
        vue_property_decorator_1.Component({ template: "<div>\n        <label v-if=\"label\" :class=\"isCheck ? 'form-check-label' : 'form-label'\" :for=\"id\">{{label}}</label>\n        <div v-if=\"isCheck\" :class=\"['form-check',{'is-invalid':hasError,'form-control':hasError}]\">\n            <div v-if=\"type == 'radio'\" v-for=\"kvp in kvpValues\" :class=\"['custom-control','custom-radio',{'custom-control-inline':inline}]\">\n                <input type=\"radio\" :id=\"concat(id,'-',kvp.key)\" :name=\"id\" :value=\"kvp.key\" \n                       :class=\"['custom-control-input',inputClass]\" :checked=\"value==kvp.key\" @change=\"onInput\" />\n                <label class=\"custom-control-label\" :for=\"concat(id,'-',kvp.key)\">{{kvp.value}}</label> \n            </div>\n            <div v-if=\"type == 'checkbox'\" v-for=\"kvp in kvpValues\" :class=\"['custom-control','custom-checkbox',{'custom-control-inline':inline}]\">\n                <input type=\"checkbox\" :id=\"concat(id,'-',kvp.key)\" :name=\"id\" :value=\"kvp.key\" \n                       :class=\"['form-check-input']\" :checked=\"hasValue(kvp.key)\" @change=\"onInputValues\" />\n                <label class=\"form-check-label\" :for=\"concat(id,'-',kvp.key)\">{{kvp.value}}</label> \n            </div>\n            <small v-if=\"help\" class=\"text-muted\">{{help}}</small>\n        </div>\n        <input v-if=\"!isCheck\" :type=\"type\" :id=\"id\" :name=\"id\" @input=\"onInput\" :value=\"value\"\n            :class=\"['form-control',{'is-invalid':errorField},inputClass]\"\n            :placeholder=\"placeholder\" />\n        <small v-if=\"!isCheck && help\" class=\"text-muted\">{{help}}</small>\n        <div v-if=\"hasError\" class=\"invalid-feedback\">{{ errorField }}</div>\n    </div>"
        })
    ], Input);
    return Input;
}(vue_property_decorator_1.Vue));
exports.Input = Input;
vue_property_decorator_1.Vue.component('Input', Input);
function inputSelectedValues(input) {
    if (input.form == null)
        throw new Error("multiple values must be within a <form> element");
    var selectedValues = [];
    var elements = input.form.elements;
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        if (el.name == input.name && el.checked) {
            selectedValues.push(el.value);
        }
    }
    return selectedValues;
}
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Select.prototype, "errorField", {
        get: function () { return shared_1.errorResponse.call(this.$props, this.id); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "hasError", {
        get: function () { return !!this.errorField; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "kvpValues", {
        get: function () {
            var kvps = (this.values || []).map(function (x) { return typeof x == 'string'
                ? { key: x, value: x }
                : x; });
            return kvps;
        },
        enumerable: true,
        configurable: true
    });
    Select.prototype.hasValue = function (elValue) {
        return this.multiple
            ? (this.value instanceof Array
                ? this.value.indexOf(elValue) >= 0
                : false)
            : this.value == elValue;
    };
    Select.prototype.onInputValues = function (e) {
        return this.multiple ? selectedOptions(e.target) : e.target.value;
    };
    __decorate([
        vue_property_decorator_1.Prop({ default: null }),
        __metadata("design:type", Object)
    ], Select.prototype, "responseStatus", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], Select.prototype, "id", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], Select.prototype, "model", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], Select.prototype, "label", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], Select.prototype, "help", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: 'form-control form-control-lg' }),
        __metadata("design:type", String)
    ], Select.prototype, "selectClass", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: false }),
        __metadata("design:type", Boolean)
    ], Select.prototype, "multiple", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: function () { return null; } }),
        __metadata("design:type", Object)
    ], Select.prototype, "value", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: function () { return []; } }),
        __metadata("design:type", Array)
    ], Select.prototype, "values", void 0);
    __decorate([
        vue_property_decorator_1.Emit('input'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [InputEvent]),
        __metadata("design:returntype", void 0)
    ], Select.prototype, "onInputValues", null);
    Select = __decorate([
        vue_property_decorator_1.Component({ template: "<div>\n        <label v-if=\"label\" class=\"form-label\">{{label}}</label>\n        <select :id=\"id\" :name=\"id\" :class=\"['form-control',{'is-invalid':errorField}, selectClass]\" \n                :multiple=\"multiple\" @change=\"onInputValues\">\n            <option v-for=\"kvp in kvpValues\" :value=\"kvp.key\" :selected=\"hasValue(kvp.key)\">{{kvp.value}}</option>\n        </select>\n        <small v-if=\"help\" class=\"text-muted\">{{help}}</small>\n        <div v-if=\"errorField\" class=\"invalid-feedback\">{{errorField}}</div>\n    </div>"
        })
    ], Select);
    return Select;
}(vue_property_decorator_1.Vue));
exports.Select = Select;
vue_property_decorator_1.Vue.component('Select', Select);
function selectedOptions(select) {
    var selectedValues = [];
    for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].selected) {
            selectedValues.push(select.options[i].value);
        }
    }
    return selectedValues;
}
var CheckBox = /** @class */ (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CheckBox.prototype, "errorField", {
        get: function () { return shared_1.errorResponse.call(this.$props, this.name); },
        enumerable: true,
        configurable: true
    });
    CheckBox.prototype.onInput = function (e) { return e.target.checked; };
    __decorate([
        vue_property_decorator_1.Prop({ default: null }),
        __metadata("design:type", Object)
    ], CheckBox.prototype, "responseStatus", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], CheckBox.prototype, "name", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], CheckBox.prototype, "placeholder", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: false }),
        __metadata("design:type", Boolean)
    ], CheckBox.prototype, "value", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], CheckBox.prototype, "model", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], CheckBox.prototype, "help", void 0);
    __decorate([
        vue_property_decorator_1.Prop({ default: '' }),
        __metadata("design:type", String)
    ], CheckBox.prototype, "inputClass", void 0);
    __decorate([
        vue_property_decorator_1.Emit('input'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [InputEvent]),
        __metadata("design:returntype", void 0)
    ], CheckBox.prototype, "onInput", null);
    CheckBox = __decorate([
        vue_property_decorator_1.Component({ template: "<div>\n        <div :class=\"['form-check',{'is-invalid':errorField,'form-control':errorField}]\">\n            <input type=\"checkbox\" :id=\"name\" :name=\"name\" @input=\"onInput\" :checked=\"value\" value=\"true\"\n                :class=\"['form-check-input',{'is-invalid':errorField},inputClass]\" />\n            <label class=\"form-check-label\" :for=\"name\"><slot></slot></label>\n        </div>\n        <small v-if=\"help\" class=\"text-muted\">{{help}}</small>\n        <div v-if=\"errorField\" class=\"invalid-feedback\">{{errorField}}</div>\n    </div>"
        })
    ], CheckBox);
    return CheckBox;
}(vue_property_decorator_1.Vue));
exports.CheckBox = CheckBox;
vue_property_decorator_1.Vue.component('CheckBox', CheckBox);
