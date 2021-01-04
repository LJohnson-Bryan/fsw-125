import React, {useState} from 'react';
import AddBountyForm from '../AddBountyForm';
import './styles.css'

const Bounty = (props) => {

const {
    first_name, 
    last_name, 
    type, price, 
    living, 
    deleteBounty, 
    editBounty, 
    _id
} = props;

const [editToggle, setEditToggle] = useState(false);

    return ( 
        <div className={`bounty ${type === 'Jedi' ? 'jedi-bg' : 'sith-bg'}`}>
            {
                !editToggle ?
                <>
                    <h2 className={living === "no" && 'dead-name'}>{first_name} {last_name}</h2>
                    <h3>Bounty Value: {price}</h3>
                    <h3>Alive?: {living}</h3>
                    
                    <button className="delete" onClick={() => deleteBounty(_id)}>Delete</button> 
                    <button className="edit" onClick={() => setEditToggle(prevToggle => !prevToggle)}>Edit</button>
                </>
                :
                <>
                    <AddBountyForm toggle={setEditToggle} submit={editBounty} {...props} buttonText={"Confirm"}/>
                    <button className="edit" onClick={() => setEditToggle(prevToggle => !prevToggle)}>Close</button>
                </>
            }
        </div>
    );
}

export default Bounty;
