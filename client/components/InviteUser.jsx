import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';

export default function InviteUser(props) {

  const [response, setResponse] = useState(false);

  const queryData = {};
  queryData.userid = props.user.userid
  queryData.username = props.user.username
  queryData.eventid = props.event.eventid
  queryData.eventtitle = props.event.eventtitle
  queryData.eventdate = props.event.eventdate
  queryData.eventstarttime = props.event.eventstarttime
  queryData.eventendtime = props.event.eventendtime
  queryData.eventdetails = props.event.eventdetails
  queryData.eventlocation = props.event.eventlocation

  const handleClickInvite = () => {
    console.log(queryData)
    setResponse(true)
    axios.post('/api/invite', queryData)
  }

  return (
    <div className='inviteFriendContainer'>
      <span className='inviteFriendName'>{props.user.firstname} {props.user.lastname}</span>
      <span className='inviteFriendButton'>
        {!response &&
          <Button variant="primary" onClick={handleClickInvite}>Invite</Button>
        }
        {response &&
          <Button variant="secondary">Invited!</Button>
        }
      </span>
    </div>
  )
}
