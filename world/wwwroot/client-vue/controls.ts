import { Vue, Component, Prop, Emit, Provide } from 'vue-property-decorator';
import { errorResponse, errorResponseExcept } from './shared'

@Component({ template: `<div v-if="errorSummary" class="alert alert-danger mt-2">{{errorSummary}}</div>` })
export class ErrorSummary extends Vue {
    @Prop({ default: null }) responseStatus!:object
    @Prop({ default: '' }) except!:string
    get errorSummary(){ return errorResponseExcept.call(this.$props, this.except); }
}
Vue.component('ErrorSummary', ErrorSummary);

@Component({ template: 
    `<div>
        <label v-if="label" :class="isCheck ? 'form-check-label' : 'form-label'" :for="id">{{label}}</label>
        <div v-if="isCheck" :class="['form-check',{'is-invalid':hasError,'form-control':hasError}]">
            <div v-if="type == 'radio'" v-for="kvp in kvpValues" :class="['custom-control','custom-radio',{'custom-control-inline':inline}]">
                <input type="radio" :id="concat(id,'-',kvp.key)" :name="id" :value="kvp.key" 
                       :class="['custom-control-input',inputClass]" :checked="value==kvp.key" @change="onInput" />
                <label class="custom-control-label" :for="concat(id,'-',kvp.key)">{{kvp.value}}</label> 
            </div>
            <div v-if="type == 'checkbox'" v-for="kvp in kvpValues" :class="['custom-control','custom-checkbox',{'custom-control-inline':inline}]">
                <input type="checkbox" :id="concat(id,'-',kvp.key)" :name="id" :value="kvp.key" 
                       :class="['form-check-input']" :checked="hasValue(kvp.key)" @change="onInputValues" />
                <label class="form-check-label" :for="concat(id,'-',kvp.key)">{{kvp.value}}</label> 
            </div>
            <small v-if="help" class="text-muted">{{help}}</small>
        </div>
        <input v-if="!isCheck" :type="type" :id="id" :name="id" @input="onInput" :value="value"
            :class="['form-control',{'is-invalid':errorField},inputClass]"
            :placeholder="placeholder" />
        <small v-if="!isCheck && help" class="text-muted">{{help}}</small>
        <div v-if="hasError" class="invalid-feedback">{{ errorField }}</div>
    </div>`
})
export class Input extends Vue {
    @Prop({ default: null }) responseStatus!:object;
    @Prop({ default: 'text' }) type!:string;
    @Prop({ default: '' }) id!:string;
    @Prop({ default: '' }) placeholder!:string;
    @Prop({ default: '' }) label!:string;
    @Prop({ default: '' }) help!:string;
    @Prop({ default: 'form-control-lg' }) inputClass!:string;
    @Prop({ default: false }) inline:boolean;
    @Prop({ default: function(){ return null; } }) value!:string[]|string;
    @Prop({ default: function(){ return []; } }) values:any[];
    

    concat(prefix:string,id:string,suffix:string) { return prefix + id + (suffix || ''); }
    get isCheck(){ return this.type == 'radio' || this.type == 'checkbox'; }
    get errorField(){ return errorResponse.call(this.$props, this.id); }
    get hasError(){ return !!this.errorField; }
    get kvpValues() {
        let kvps = (this.values || []).map(x => typeof x == 'string'
            ? { key: x, value: x }
            : x);
        return kvps;
    }

    @Emit('input')
    onInput(e:InputEvent) { return e.target.value; }

    @Emit('input')
    onInputValues(e:InputEvent) { return inputSelectedValues(e.target); }
    
    hasValue(elValue:string) {
        return this.type == 'checkbox' 
            ? (this.value instanceof Array
                ? this.value.indexOf(elValue) >= 0
                : false)
            : this.value == elValue;
    }
}
Vue.component('Input', Input);

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

@Component({ template:
    `<div>
        <label v-if="label" class="form-label">{{label}}</label>
        <select :id="id" :name="id" :class="['form-control',{'is-invalid':errorField}, selectClass]" 
                :multiple="multiple" @change="onInputValues">
            <option v-for="kvp in kvpValues" :value="kvp.key" :selected="hasValue(kvp.key)">{{kvp.value}}</option>
        </select>
        <small v-if="help" class="text-muted">{{help}}</small>
        <div v-if="errorField" class="invalid-feedback">{{errorField}}</div>
    </div>`
})
export class Select extends Vue {
    @Prop({ default: null }) responseStatus!:object;
    @Prop({ default: '' }) id!:string;
    @Prop({ default: '' }) label!:string;
    @Prop({ default: '' }) help!:string;
    @Prop({ default: 'form-control form-control-lg' }) selectClass!:string;
    @Prop({ default: false }) multiple:boolean;
    @Prop({ default: function(){ return null; } }) value!:string[]|string;
    @Prop({ default: function(){ return []; } }) values:any[];
    
    get errorField(){ return errorResponse.call(this.$props, this.id); }
    get hasError(){ return !!this.errorField; }
    get kvpValues() {
        let kvps = (this.values || []).map(x => typeof x == 'string'
            ? { key: x, value: x }
            : x);
        return kvps;
    }

    hasValue(elValue:string) {
        return this.multiple
            ? (this.value instanceof Array
                ? this.value.indexOf(elValue) >= 0
                : false)
            : this.value == elValue;
    }

    @Emit('input')
    onInputValues(e:InputEvent) {
        return this.multiple ? selectedOptions(e.target as any as HTMLSelectElement) : e.target.value;
    }
}
Vue.component('Select', Select);

function selectedOptions(select:HTMLSelectElement) {
    let selectedValues = [];
    for (let i = 0; i<select.options.length; i++) {
        if (select.options[i].selected) {
            selectedValues.push(select.options[i].value);
        }
    }
    return selectedValues;
}

@Component({ template: 
    `<div>
        <div :class="['form-check',{'is-invalid':errorField,'form-control':errorField}]">
            <input type="checkbox" :id="id" :name="id" @input="onInput" :checked="value" value="true"
                :class="['form-check-input',{'is-invalid':errorField},inputClass]" />
            <label class="form-check-label" :for="id"><slot></slot></label>
        </div>
        <small v-if="help" class="text-muted">{{help}}</small>
        <div v-if="errorField" class="invalid-feedback">{{errorField}}</div>
    </div>`
})
export class CheckBox extends Vue {
    @Prop({ default: null }) responseStatus!:object;
    @Prop({ default: '' }) id!:string;
    @Prop({ default: '' }) placeholder!:string;
    @Prop({ default: false }) value!:boolean;
    @Prop({ default: '' }) help!:string;
    @Prop({ default: '' }) inputClass!:string;

    get errorField(){ return errorResponse.call(this.$props, this.id); }

    @Emit('input')
    onInput(e:InputEvent) { return e.target.checked; }
}
Vue.component('CheckBox', CheckBox);
