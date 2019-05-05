import * as React from 'react';
import { useState, useContext } from 'react';
import { StateContext, client } from '../shared'
import { ErrorSummary, Input, CheckBox, Select } from '../controls';
import {Contact, CreateContact, DeleteContact, GetContacts, Title} from "../../dtos";

const Contacts : React.FC<any> = ({ contacts, contactTitles, contactColors, contactGenres }) => {
    const {state, dispatch} = useContext(StateContext);

    const [loading, setLoading] = useState(false);
    const [responseStatus, setResponseStatus] = useState(null);

    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [filmGenres, setFilmGenres] = useState([]);
    const [age, setAge] = useState(13);
    const [agree, setAgree] = useState(false);
    const [results, setResults] = useState(contacts as Contact[]);

    async function submit() {
        try {
            setLoading(true);

            const request = new CreateContact({
                title: title as Title,
                name,
                color,
                filmGenres,
                age,
                agree
            });

            await client.post(request);

            await refresh();

            setResponseStatus(null);
            reset();

        } catch (e) {
            setResponseStatus(e.responseStatus || e);
        } finally {
            setLoading(false);
        }
    }

    async function refresh() {
        setResults((await client.get(new GetContacts())).results);
    }

    function reset() {
        setTitle('');
        setName('');
        setColor('');
        setFilmGenres([]);
        setAge(13);
        setAgree(false);
    }

    async function remove(id:number) {
        if (!confirm('Are you sure?'))
            return;

        await client.delete(new DeleteContact({ id }));
        await refresh();
    }

    return (<div className="col-lg-4">
        <h3>Add new Contact</h3>

        <form onSubmit={async e => { e.preventDefault(); await submit(); }}>
            
            <ErrorSummary except="title,name,color,filmGenres,age,agree" responseStatus={responseStatus} />
        
            <div className="form-group">
                <Input type="radio" id="title" value={title} onChange={setTitle} values={contactTitles} inline={true} responseStatus={responseStatus} />
            </div>
            <div className="form-group">
                <Input id="name" value={name} onChange={setName} placeholder="Name" responseStatus={responseStatus}
                       label="Full Name" help="Your first and last name" />
            </div>
            <div className="form-group">
                <Select id="color" value={color} onChange={setColor} values={['',...contactColors]} label="Favorite color" responseStatus={responseStatus} />
            </div>
            <div className="form-group">
                <Input type="checkbox" id="filmGenres" value={filmGenres} onChange={setFilmGenres} values={contactGenres} responseStatus={responseStatus}  
                       label="Favorite Film Genres" help="choose one or more" />
            </div>
            <div className="form-group">
                <Input type="number" id="age" value={`${age}`} onChange={x => setAge(Number(x))} inputClass="col-4" placeholder="Age" responseStatus={responseStatus} />
            </div>
            <div className="form-group">
                <CheckBox id="agree" value={agree} onChange={setAgree} responseStatus={responseStatus}>
                    Agree to terms and conditions
                </CheckBox>
            </div>
            <div className="form-group">
                <button className="btn btn-primary" type="submit">Add Contact</button>
                {" "}
                <a href="javascript:void(0)" onClick={e => reset()}>reset</a>
            </div>
        </form>
        
        <table id="results">
        <tbody>
        {results.map(c => (
            <tr key={c.id} style={ {background:c.color} }>
                <td>{c.title} {c.name} ({c.age})</td>
                <td><a href={`/client-react/contacts/${c.id}/edit`}>edit</a></td>
                <td><button className="btn btn-sm btn-primary" onClick={e => remove(c.id)}>delete</button></td>
            </tr>
        ))}
        </tbody>
        </table>
    
    </div>);
};