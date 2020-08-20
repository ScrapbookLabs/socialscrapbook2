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


  // "uselessid" serial PRIMARY KEY,
  //   "userid" bigint NOT NULL,
  //   "username" varchar NOT NULL,
  //   "eventid" bigint NOT NULL,
  //   "eventtitle" varchar NOT NULL,
  //   "eventdate" varchar NOT NULL,
  //   "eventstarttime" varchar NOT NULL,
  //   "eventendtime" varchar NOT NULL,
  //   "eventdetails" varchar NOT NULL,
  //   "eventlocation" varchar NOT NULL,

  const handleClickInvite = () => {
    // have userid and username
    console.log('works')
    console.log(queryData)
    setResponse(true)

    fetch('/api/invite', {
      method: 'POST',
      body: JSON.stringify(queryData),
      headers: { 
        'Content-Type': 'application/json' 
      }
    })
  }

  return (
    <div key={props.forKey} className='inviteFriendContainer'>
      <span className='inviteFriendPhoto'>Photo  </span>
      <span className='inviteFriendFirstName'>{props.user.firstname}</span>
      <span className='inviteFriendLastName'>{props.user.lastname}</span>
      <span className='inviteFriendButton'>
        {!response && 
          <button className='inviteUser' onClick={handleClickInvite}>Invite</button>
        }
        {response &&
          <button className='inviteMadeUser'>Invited!</button>
        }
      </span>
    </div>
  )
}
