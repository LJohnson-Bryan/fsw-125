import {React, useState, useEffect} from 'react';
import Container from '../Container';
import Hero from '../Hero';
import Card from '../Card';
import axios from 'axios';
import {useLocation, Link} from "react-router-dom";
import Footer from '../Footer';

const Search = (props) => {

    const [people, setPeople] = useState([]);

    const getPeople = () => {
        setPeople([]);
        axios.get(`/people?s=${query.get('s')}`)
        .then(res => {
            setPeople(res.data);
        })
        .catch(err => {
        console.log(err);
        })
    }
    
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();

    useEffect(() => {
        setPeople([]);
        getPeople();
    }, []);

    return ( 
        <div>
            <Hero title="Search Results" subTitle="Can't find what you're looking for? Click go home!" results={true} getPeople={getPeople}/>
            <Container>
                <h2>Search Results for: {query.get("s")}</h2>
                <Link to="/" className="go-home">Go Home</Link>
                <div className="contents">
                    {people.length !== 0 ? 
                    people.map(person => <Link to={`/people/${person._id}`}><Card name={person.name} age={person.age} image={person.image}/></Link>)
                    :
                    <p>No Results Found...</p>}
                </div>
            </Container>
            <Footer />
        </div> 
    );
}

export default Search;
