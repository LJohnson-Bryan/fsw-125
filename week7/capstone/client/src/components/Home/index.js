import {React, useState, useEffect} from 'react';
import Card from '../Card';
import Hero from '../Hero';
import Container from '../Container';
import axios from 'axios';
import Footer from '../Footer';
import {Link, useHistory} from 'react-router-dom';

const Home = () => {
    const [people, setPeople] = useState([]);

    const getPeople = () => {
        axios.get('/people')
        .then(res => {
        setPeople(res.data);
        })
        .catch(err => {
        console.log(err);
        })
    }

    // const deletePerson = personID => {
    //     axios.delete(`/people/${personID}`)
    //     .then(res => {
    //         setPeople(prevPeople => prevPeople.filter(person => person._id !== personID))
    //     })
    //     .catch(err => console.log(err))
    // }

    // const editPeople = (peopleUpdate, peopleID) => {
    //     axios.put(`/people/${peopleID}`, peopleUpdate)
    //     .then(res => {
    //         setPeople(prevPeople => prevPeople.map(person => person._id !== peopleID ? person : res.data))
    //     })
    //     .catch(err => console.log(err))
    // }

    useEffect(() => {
        getPeople();
    }, []);

    return (
        <div>
            <Hero status="home"/>
            <Container>
                <div className="contents">
                    {people.map(person => <Link to={`/people/${person._id}`}><Card name={person.name} age={person.age} image={person.image}/></Link>)}
                </div>
            </Container>
            <Footer />
    </div>
    );
}

export default Home;
