import { Vue, Component } from 'vue-property-decorator';
import { client } from '../shared';
import { CreateContact, DeleteContact, GetContacts, Contact, Title } from '../../dtos';

@Component({ template:
    `<div class="col-lg-4">
        <h3>Add new Contact</h3>

        <form @submit.prevent="submit" @keyup.native.enter="submit">
            <ErrorSummary :responseStatus="responseStatus" except="title,name,color,filmGenres,age,agree" />
        
            <div class="form-group">
                <Input type="radio" id="title" v-model="title" :values="contactTitles" :inline="true" :responseStatus="responseStatus" />
            </div>
            <div class="form-group">
                <Input id="name" v-model="name" placeholder="Name" :responseStatus="responseStatus"
                       label="Full Name" help="Your first and last name" />                
            </div>
            <div class="form-group">
                <Select id="color" v-model="color" :values="['',...contactColors]" label="Favorite color" :responseStatus="responseStatus" />
            </div>
            <div class="form-group">
                <Input type="checkbox" id="filmGenres" v-model="filmGenres" :values="contactGenres"
                       label="Favorite Film Genres" help="choose one or more" :responseStatus="responseStatus" />
            </div>
            <div class="form-group">
                <Input type="number" id="age" v-model="age" inputClass="col-4" placeholder="Age" :responseStatus="responseStatus" />
            </div>
            <div class="form-group">
                <CheckBox id="agree" v-model="agree" :responseStatus="responseStatus">
                    Agree to terms and conditions
                </CheckBox>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="submit">Add Contact</button>
                <a href="javascript:void(0)" @click.prevent="reset">reset</a>
            </div>
        </form>
        
        <table id="results">
            <tr v-for="c in results" :key="c.id" :style="concat('background:',c.color)">
                <td>{{c.title}} {{c.name}} ({{c.age}})</td>
                <td><a :href="concat('/client-vue/contacts/',c.id,'/edit')">edit</a></td>
                <td><button class="btn btn-sm btn-primary" @click="remove(c.id)">delete</button></td>
            </tr>
        </table>

    </div>`,
    props: { 
        redirect: String
    }
})
export class Contacts extends Vue {

    loading = false;
    valid = true;

    title = "";
    name = "";
    color = "";
    filmGenres = [];
    age = 13;
    agree = false;
    results:Contact[] = [];

    responseStatus = null;

    async mounted() {
        this.results = (this as any).contacts;
    }

    concat(prefix:string,id:string,suffix:string) {
        return prefix + id + (suffix || '');
    }

    async submit() {
        try {
            this.loading = true;
            
            const request = new CreateContact({
                title: this.title as Title,
                name: this.name,
                color: this.color,
                filmGenres: this.filmGenres,
                age: this.age,
                agree: this.agree
            });
            
            await client.post(request);

            await this.refresh();

            this.responseStatus = null;
            this.reset();
            
        } catch (e) {
            this.responseStatus = e.responseStatus || e;
        } finally {
            this.loading = false;
        }
    }
    async refresh() {
        this.results = (await client.get(new GetContacts())).results;
    }
    reset() {
        this.title = "";
        this.name = "";
        this.color = "";
        this.filmGenres = [];
        this.age = 13;
        this.agree = false;
    }
    cancel() {
        this.reset();
    }
    async remove(id:number) {
        if (!confirm('Are you sure?'))
            return;

        await client.delete(new DeleteContact({ id }));
        await this.refresh();
    }
}
