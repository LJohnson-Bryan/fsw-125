import React, { useState } from 'react';
import './styles.css';

const AddBountyForm = (props) => {
    const {submit} = props;

    const initInputs = {
        first_name: props.first_name || "", 
        last_name: props.last_name || "", 
        type: props.type || "None", 
        living: props.living || true, 
        price: props.price || 0
    }

    const [inputs, setInputs] = useState(initInputs);

    const handleChange = e => {
        const {name, value} = e.target;
        setInputs(prevInputs => ({...prevInputs, [name]: value}));
    }

    const handleSubmit = e => {
        e.preventDefault();
        submit(inputs, props._id);
        setInputs(initInputs);
        props.toggle && props.toggle(false);
    }

    return ( 
        <form onSubmit={handleSubmit}>

            <input type="text" 
            name="first_name" 
            value={inputs.first_name} 
            onChange={handleChange} 
            placeholder="First Name"/>

            <input type="text" 
            name="last_name" 
            value={inputs.last_name} 
            onChange={handleChange} 
            placeholder="Last Name"/>
<br />
            Bounty Value: <input type="number" 
            name="price" 
            value={inputs.price} 
            onChange={handleChange} 
            placeholder="Bounty Value"/>
            <br />
            <label>Type:</label> 
            <br />
            Sith: <input type="radio" name="type" onChange={() => setInputs(prevInputs => {
                return {...prevInputs, type: "Sith"};
            })} value={inputs.type} checked={inputs.type === "Sith" ? true : false}/> 
            <br />
            Jedi: <input type="radio" name="type" onChange={() => setInputs(prevInputs => {
                return {...prevInputs, type: "Jedi"};
            })} value={inputs.type} checked={inputs.type === "Jedi" ? true : false} /> 
            <br />
            <label>Alive:</label> 
            <br />
            Yes: <input type="radio" name="living" onChange={() => setInputs(prevInputs => {
                return {...prevInputs, living: "yes"};
            })} value={inputs.type} checked={inputs.living === "yes" ? true : false}/> 
            <br />
            No: <input type="radio" name="living" onChange={() => setInputs(prevInputs => {
                return {...prevInputs, living: "no"};
            })} value={inputs.type} checked={inputs.living === "no" ? true : false} /> 
            <br />
            <button>{props.buttonText}</button>
        </form>
    );
}

export default AddBountyForm;
