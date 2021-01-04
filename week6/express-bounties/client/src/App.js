import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bounty from './components/Bounty';
import AddBountyForm from './components/AddBountyForm';
import './index.css';

function App() {
  const [bounties, setBounties] = useState([]);
  
  const getBounties = () => {
    axios.get('/bounties')
    .then(res => {
      setBounties(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const addBounty = newBounty => {
    axios.post("/bounties", newBounty)
    .then(res => setBounties(prevBounties => [...prevBounties, res.data]))
    .catch(err => console.log(err))
  }

  const deleteBounty = bountyID => {
    axios.delete(`/bounties/${bountyID}`)
    .then(res => {
      setBounties(prevBounties => prevBounties.filter(bounty => bounty._id !== bountyID))
    })
    .catch(err => console.log(err))
  }

  const editBounty = (bountyUpdate, bountyID) => {
    axios.put(`/bounties/${bountyID}`, bountyUpdate)
    .then(res => {
      setBounties(prevBounties => prevBounties.map(bounty => bounty._id !== bountyID ? bounty : res.data))
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getBounties();
  }, []);

  return (
    <div className="bounties">

      <div className="bounties-container container text-center">
        <h1>Bounty Tracker</h1>
      <AddBountyForm submit={addBounty} buttonText={"Post Bounty"} />
      {bounties.map(bounty => <Bounty {...bounty} deleteBounty={deleteBounty} editBounty={editBounty} key={bounty._id} />)}
      </div>
    </div>
  );
}

export default App;
