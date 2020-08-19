import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';

export default function InviteUser(props) {
  
  const handleClickInvite = () => {
    // have userid and username
    console.log('works')
    console.log(props.users)
    console.log(props.event)
  }

  return (
    <div key={props.forKey} className='inviteFriendContainer'>
      <span className='inviteFriendPhoto'>Photo  </span>
      <span className='inviteFriendFirstName'>{props.user.firstname}</span>
      <span className='inviteFriendLastName'>{props.user.lastname}</span>
      <span className='inviteFriendButton'>
        <button onClick={handleClickInvite}>Invite</button>
      </span>
    </div>
  )
}
