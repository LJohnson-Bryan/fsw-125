import {React, useState} from 'react';
import Button from '../Button';
import Container from '../Container';
import Hero from '../Hero';
import {Link, useHistory} from "react-router-dom";
import './styles.css';
import axios from 'axios';
import Footer from '../Footer';

const AddPerson = () => {

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [ageField, setAgeField] = useState(undefined);
    const [isAliveField, setIsAliveField] = useState(false);
    const [imageField, setImageField] = useState('');
    const history = useHistory();


    const addPeople = newPerson => {
        axios.post("/people", newPerson)
        .then(res => history.push(`/people/${res.data._id}`))
        .catch(err => console.log(err))
    }

    return ( 
        <div>
            <Hero title="Favorite People" subTitle="Add a new person to the database to log favorite things." results="yes"/>
            <div className="content">
                <Container>
                    <Link to="/" className="go-home">Go Home</Link>
                    <form className="input-form" onSubmit={e => {
                        e.preventDefault();
                        const newPerson = {
                            name: nameField,
                            email: emailField,
                            age: ageField,
                            alive: isAliveField,
                            image: imageField,
                            favoriteThings: []
                        }
                        addPeople(newPerson);
                    }}>
                        <input className="mr-1" placeholder="Name" value={nameField} onChange={e => setNameField(e.target.value)} />
                        <input className="mr-1" placeholder="Email" value={emailField} onChange={e => setEmailField(e.target.value)} />
                        <input className="mr-1" placeholder="Age" type="number" value={ageField} onChange={e => setAgeField(e.target.value)} />
                        <input className="mr-1" placeholder="Image URL..." value={imageField} onChange={e => setImageField(e.target.value)} /><br />
                        <div className="mx-auto">
                            <input className="mr-1" type="checkbox" value={isAliveField} onChange={e => setIsAliveField(e.target.checked)}/> <label>Alive?</label><br />
                        </div>
                        <Button classes="mx-auto mt-1">Submit</Button>
                    </form>
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export default AddPerson;
