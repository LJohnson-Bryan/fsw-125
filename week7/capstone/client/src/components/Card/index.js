import React from 'react';
import './styles.css';

const Card = (props) => {
    return ( 
        <div className="personCard">
            <div className="profile-picture" style={{backgroundImage: `url(${props.image})`}}></div>
            <h2>{props.name}</h2>
            <h3>{props.age} yr. old</h3>
        </div>
    );
}

export default Card;
