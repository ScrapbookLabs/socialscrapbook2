import React, { useState, useEffect } from "react";
import axios from "axios";
import InboxItem from './InboxItem.jsx'

export default function Inbox(props) {
  const {username, userid} = props.user

  const [inviteData, setInviteData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.post('/api/inviteListGet', {
      userid: userid
    })
      .then((res)=>{
        console.log('response from InviteListGet')
        console.log(res.data.invites)
        const response = res.data.invites;
        const eventNames = [];
        response.forEach((el)=>{
          eventNames.push(el.eventtitle)
        })
        setLoading(false)
        setInviteData(eventNames);
      })
  }, []);

  if (loading) {
    return (
      <div className='inboxContainer'>
        Loading...
      </div>
    )
  } else {
    const eventList = inviteData.map((el, i)=>{
      return (
        <InboxItem key={i} username={username} userid={userid} el={el} i={i}/>
      )
    })
    return (
      <div className='inboxContainer'>
        {inviteData[0] && eventList}
        {!inviteData[0] &&
          <div>You have no pending invitations</div>
        }
      </div>
    )
  }
}
