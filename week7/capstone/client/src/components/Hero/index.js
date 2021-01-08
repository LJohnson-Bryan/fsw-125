import {React, useState} from 'react';
import './styles.css';
import {useHistory} from "react-router-dom";
import Button from '../Button';

const Hero = (props) => {
    const history = useHistory();
    const [searchBar, setSearchBar] = useState('');

    return ( 
        <div className="hero">
            <h1>
                {props.title}
            </h1>
            <h2>
                {props.subTitle}
            </h2>
            <div className="line"></div>
            <form onSubmit={e => {
                e.preventDefault();
                history.push(`/search?s=${searchBar}`);
                setSearchBar('');
            }}>
            {!props.results && <input placeholder="Search for friends, family..." value={searchBar} onChange={(e => setSearchBar(e.target.value)) }/>} 
            </form>
            {props.status === "home" && <Button classes="mt-1" onClick={() => history.push("/add")}>Add New Person</Button>}
        </div>
    );
}

Hero.defaultProps = {
    title: "Favorite Things",
    subTitle: "Families, friends, look at them all here!"
}

export default Hero;
