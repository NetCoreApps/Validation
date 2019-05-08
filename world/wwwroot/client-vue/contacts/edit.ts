import { Vue, Component } from 'vue-property-decorator';
import { client, redirect } from '../shared';
import { UpdateContact, Title } from '../../dtos';

@Component({ template:
    `<div class="col-lg-4">
        <h3>Update Contact</h3>

        <form @submit.prevent="submit" @keyup.native.enter="submit">
            <ErrorSummary :responseStatus="responseStatus" except="title,name,color,filmGenres,age" />
        
            <div class="form-group">
                <Input type="radio" id="title" v-model="title" :values="contactTitles" :inline="true" :responseStatus="responseStatus" />
            </div>
            <div class="form-group">
                <Input id="name" v-model="name" placeholder="Name" :responseStatus="responseStatus"
                       label="Full Name" help="Your first and last name" />                
            </div>
            <div class="form-group">
                <Select id="color" v-model="color" :values="contactColors" label="Favorite color" :responseStatus="responseStatus" />
            </div>
            <div class="form-group">
                <Input type="checkbox" id="filmGenres" v-model="filmGenres" :values="contactGenres"
                       label="Favorite Film Genres" help="choose one or more" :responseStatus="responseStatus" />
            </div>
            <div class="form-group">
                <Input type="number" id="age" v-model="age" inputClass="col-4" placeholder="Age" :responseStatus="responseStatus" />
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="submit">Update Contact</button>
                <a href="../">cancel</a>
            </div>
        </form>
    </div>`,
    props: { 
        redirect: String
    }
})
export class EditContact extends Vue {

    loading = false;
    valid = true;

    id = 0;
    title = "";
    name = "";
    color = "";
    filmGenres = [];
    age = 0;

    responseStatus = null;

    async mounted() {
        Object.assign(this, (this as any).contact);
    }

    concat(prefix:string,id:string,suffix:string) {
        return prefix + id + (suffix || '');
    }

    async submit() {
        try {
            this.loading = true;
            
            const request = new UpdateContact({
                id: this.id,
                title: this.title as Title,
                name: this.name,
                color: this.color,
                filmGenres: this.filmGenres,
                age: this.age,
            });
            
            await client.post(request);
            redirect('../');

            this.responseStatus = null;

        } catch (e) {
            this.responseStatus = e.responseStatus || e;
        } finally {
            this.loading = false;
        }
    }
}
