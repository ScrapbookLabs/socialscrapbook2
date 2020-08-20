import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Inbox(props) {
  const {username, userid} = props.user
  
  const [inviteData, setInviteData] = useState([]);

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
        setInviteData(eventNames)
      })
  }, []);

  const handleClickAttend = (eventtitle) => {
    axios.post('/api/inviteAttend', {
      username, eventtitle
    })
  }

  const handleClickDecline = (eventtitle) => {
    axios.post('/api/inviteDecline', {
      username, eventtitle
    })
  }
    
  if (false) {
    return (
      <div>
        There are no pending events
      </div>
    )
  } else {
    const eventList = inviteData.map((el, i)=>{
      return (
        <div key={i} className='inboxItem'>
          <div className='inboxDetails'>
            {/* <span className='inboxItemPhoto'>add event photo </span> */}
            <span className='inboxItemEventNameTitle'>Event Name: </span>
            <span className='inboxItemEventName'>{el}</span>
          </div>
          <div className='inboxButtons'>
            <span>
              <button className="inboxSubmitAttend" onClick={()=>{handleClickAttend(el)}}>Attend</button>
            </span>
            <span>
              <button className="inboxSubmitDecline" onClick={()=>{handleClickDecline(el)}}>Decline</button>
            </span>
          </div>
        </div>
      )
    })
    return (
      <div id='inboxContainer'>
        {eventList}
      </div>
    )
  }
}