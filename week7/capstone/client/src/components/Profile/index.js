import {React, useState, useEffect} from 'react';
import './styles.css';
import {useParams, Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import Container from '../Container';
import Footer from '../Footer';
import Button from '../Button';
import Thing from '../Thing';

const Profile = (props) => {
    const { id } = useParams();
    const [profileInfo, setProfileInfo] = useState([]);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editNameInput, setEditNameInput] = useState();
    const [editAgeInput, setEditAgeInput] = useState();
    const [emailInput, setEmailInput] = useState();
    const [isAliveInput, setIsAliveInput] = useState(false);

    const history = useHistory();

    const getProfile = id => {
        axios.get(`/people/${id}`)
        .then(res => {
            setProfileInfo(res.data);
            setEditAgeInput(res.data.age);
            setEditNameInput(res.data.name);
            setIsAliveInput(res.data.alive);
            setEmailInput(res.data.email);
        })
        .catch(err => console.log(err));
    }

    const submitProfile = () => {
        const newObject = {
            name: editNameInput,
            age: editAgeInput,
            email: emailInput,
            alive: isAliveInput
        }
        axios.put(`/people/${_id}`, newObject)
        .then(getProfile(_id))
        .catch(err => console.log(err));
    }

    const addFavoriteThing = item => {
        const newObject = {
            favoriteThings: [...profileInfo.favoriteThings, item]
        }
        axios.put(`/people/${_id}`, newObject)
        .then(getProfile(_id))
        .catch(err => console.log(err));
    }

    const deleteProfile = () => {
        axios.delete(`/people/${_id}`)
        .then(history.push("/"))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getProfile(id);
    }, []);

    const {name, age, email, _id, image, favoriteThings} = profileInfo;
    const [favoriteForm, setFavoriteForm] = useState('');

    const isAlive = profileInfo.alive;

    const submitForm = e => {
        e.preventDefault();
        addFavoriteThing(favoriteForm);
        setFavoriteForm('');
    }

    return ( 
        <div className='profile'>
            <Container>
                <Link to="/" className="go-home">Go Home</Link>
                {
                profileInfo.length !== 0 ? 
                <div className="profile-content"> 
                    <div className="flex flex-c-sm">
                        <div className="image" style={{backgroundImage: `url(${image})`}}></div>
                        <div className="profile-info-box">
                            {isEditingProfile ? 
                            <form>
                                <input className="edit-profile-input" placeholder="Name" value={editNameInput} onChange={e => setEditNameInput(e.target.value)}/>
                                <input className="edit-profile-input" placeholder="Age" type="number" value={editAgeInput} onChange={e => setEditAgeInput(e.target.value)}/>
                                <input className="edit-profile-input" placeholder="Email" value={emailInput} onChange={e => setEmailInput(e.target.value)}/><br />
                                <input className="edit-profile-input" type="checkbox" checked={isAliveInput} onChange={e => setIsAliveInput(e.target.checked)} /> <label>Alive?</label>
                            </form>
                            :
                            <div>
                                <p>{name}</p>
                                <p>Age: {age}</p>
                                <p>Email: {email}</p>
                                <p>Alive? {isAlive ? "Yes" : "No"}</p>
                            </div>
                            }
                            <div className="mt-1 buttons-box">
                            <Button color="blue" classes="mr-1" onClick={() => {
                                if(isEditingProfile) {
                                    submitProfile();
                                    setIsEditingProfile(false);
                                } else {
                                    setIsEditingProfile(true);
                                }
                            }}>{isEditingProfile ? "Done" : "Edit"}</Button> 
                            <Button color="red" onClick={() => deleteProfile()}>Delete</Button>
                        </div>
                        </div>
                        <div className="things ml-1">
                            <p className="things-title">Favorite Things:</p>
                            {favoriteThings.map(favoriteThing => <Thing thing={favoriteThing} profileInfo={profileInfo} setProfileInfo={setProfileInfo} />)}
                            <form onSubmit={e => submitForm(e)}>
                                <input className="favorite-input" placeholder="Enter favorite thing..." value={favoriteForm} onChange={e => setFavoriteForm(e.target.value)}/>
                                <Button classes="mt-1 ml-1">Add Thing</Button>
                            </form>
                        </div>
                        </div>
                    </div>
                :
                <p className="tc">Loading...</p>
                }
            </Container>
            <Footer />
        </div>
    );
}

export default Profile;
