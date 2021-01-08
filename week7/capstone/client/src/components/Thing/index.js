import {React, useState, useEffect} from 'react';
import Button from '../Button';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const Thing = (props) => {
    const [currentEditForm, setCurrentEditForm] = useState('');
    const [editThingToggle, setEditThingToggle] = useState(false);

    const { id } = useParams();
    const {thing, profileInfo, setProfileInfo} = props;

    const getProfile = id => {
        axios.get(`/people/${id}`)
        .then(res => setProfileInfo(res.data))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        setCurrentEditForm(thing);
        getProfile(id);
    }, []);


    const submitEditThing = item => {
        const favoriteThingIndex = profileInfo.favoriteThings.findIndex(itemToFind => itemToFind === item);
        console.log(favoriteThingIndex);
        const things = profileInfo.favoriteThings;
        things[favoriteThingIndex] = currentEditForm;
        const newObject = {
            favoriteThings: things
        }
        axios.put(`/people/${id}`, newObject)
        .then(res => {
            getProfile(id)
        })
        .catch(err => console.log(err));
    }

    const deleteFavoriteThing = item => {
        const newThings = profileInfo.favoriteThings.filter(thing => thing !== item)
        const newObject = {
            favoriteThings: newThings
        }
        axios.put(`/people/${id}`, newObject)
        .then(res => {
            getProfile(id)
        })
        .catch(err => console.log(err));
    }

    return ( 
        <div className="thing mt-1">
        {editThingToggle ? <input value={currentEditForm} onChange={e => setCurrentEditForm(e.target.value)}/> : <div>{thing}</div>}
        <Button 
            classes="thing-button mr-1 sm-btn" 
            color="blue"
            onClick={() => {
                if(editThingToggle) {
                    // SUBMIT FORM 
                    submitEditThing(thing);
                    setEditThingToggle(false);
                } else {
                    setEditThingToggle(true);
                }
            }}>Edit</Button>
        <Button 
            classes="thing-button" 
            color="red"
            onClick={() => deleteFavoriteThing(thing)}
        >Delete</Button>
    </div>
    );
}

export default Thing;
