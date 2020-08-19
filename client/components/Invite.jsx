import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';
import InviteUser from './InviteUser.jsx'

export default function Invite(props) {
  const [show, setShow] = useState(true);
  const [friends, setFriends] = useState([]);
  const [friendsData, setFriendsData] = useState([]);

  const handleClickClose = () => setShow(false);

   useEffect(() => {
    axios('/api/invite')
      .then((res)=>{
        const resUsers = res.data.users
        setFriendsData(res.data.users)
        setFriends(resUsers.map((el, i)=>{
          return (
            <InviteUser forKey={`invite${i}`} event={props.event} user={el} users={res.data.users} />
          )
        }))
      })
   }, []);
  
  const handleClickInvite = () => {
    // have userid and username
    console.log('works')
  }

  return (
    <div>
      <Modal show={show}>
        <Modal.Body>
          <div className='inviteContainer'>
            <h1 id='inviteHeader'>Invite Friends to your Event</h1>
            <div className='inviteScrollContainer'>
              {friends}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClickClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
