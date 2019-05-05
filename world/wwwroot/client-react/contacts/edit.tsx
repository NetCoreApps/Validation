import * as React from 'react';
import { useState, useContext } from 'react';
import { StateContext, client, redirect } from '../shared'
import { ErrorSummary, Input, CheckBox, Select } from '../controls';
import {Contact, CreateContact, DeleteContact, GetContacts, Title, UpdateContact} from "../../dtos";

const EditContact : React.FC<any> = ({ contact, contactTitles, contactColors, contactGenres }) => {
    const {state, dispatch} = useContext(StateContext);

    const [loading, setLoading] = useState(false);
    const [responseStatus, setResponseStatus] = useState(null);

    const [id, setId] = useState(contact.id);
    const [title, setTitle] = useState(contact.title);
    const [name, setName] = useState(contact.name);
    const [color, setColor] = useState(contact.color);
    const [filmGenres, setFilmGenres] = useState(contact.filmGenres);
    const [age, setAge] = useState(contact.age);

    async function submit() {
        try {
            setLoading(true);

            const request = new UpdateContact({
                id,
                title: title as Title,
                name,
                color,
                filmGenres,
                age,
            });

            await client.post(request);

            redirect('../');

            setResponseStatus(null);

        } catch (e) {
            setResponseStatus(e.responseStatus || e);
        } finally {
            setLoading(false);
        }
    }

    return (<div className="col-lg-4">
        <h3>Update Contact</h3>

        <form onSubmit={async e => { e.preventDefault(); await submit(); }}>
            <ErrorSummary except="title,name,color,filmGenres,age" responseStatus={responseStatus} />
    
            <div className="form-group">
                <Input type="radio" id="title" value={title} onChange={setTitle} values={contactTitles} inline={true} 
                       responseStatus={responseStatus} />
            </div>
            <div className="form-group">
                <Input id="name" value={name} onChange={setName} placeholder="Name" responseStatus={responseStatus}
                 label="Full Name" help="Your first and last name" />
            </div>
            <div className="form-group">
                <Select id="color" value={color} onChange={setColor} values={contactColors} label="Favorite color" 
                        responseStatus={responseStatus} />
            </div>
            <div className="form-group">
                <Input type="checkbox" id="filmGenres" value={filmGenres} onChange={setFilmGenres} values={contactGenres}
                       label="Favorite Film Genres" help="choose one or more" responseStatus={responseStatus} />
            </div>
            <div className="form-group">
                <Input type="number" id="age" value={age}  onChange={x => setAge(Number(x))} inputClass="col-4" 
                       placeholder="Age" responseStatus={responseStatus} />
            </div>
            <div className="form-group">
                <button className="btn btn-primary" type="submit">Update Contact</button>
                {" "}
                <a href="../">cancel</a>
            </div>
        </form>
    </div>);
};
