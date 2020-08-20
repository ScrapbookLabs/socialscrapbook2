import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';
import InviteUser from './InviteUser.jsx'

export default function Invite(props) {
  const [show, setShow] = useState(true);
  const [friends, setFriends] = useState([]);
  const [friendsData, setFriendsData] = useState([]);

  const handleClickClose = () => {
    setShow(false);
    setTimeout(() => {
      props.setInviteView(false);
    }, 250)
  };

  useEffect(() => {
    axios.post('/api/inviteFilter', { eventtitle: props.eventtitle })
      .then((res)=>{
        const resUsers = res.data.users
        setFriendsData(res.data.users)
        setFriends(resUsers.map((el, i)=>{
          return (
            <InviteUser key={`invite${i}`} event={props.event} user={el} users={res.data.users} />
          )
        }))
      })
  }, []);

  return (
    <div>
      <Modal show={show} onHide={handleClickClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Invite Friends to this Event!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='inviteContainer'>
            <div className='inviteScrollContainer'>
              {friends}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
