import React, { useState, useEffect } from "react";

export default function Inbox(props) {
  const {username, userid} = props.user
  
  const [inviteData, setInviteData] = useState([]);

  useEffect(() => {
    fetch('/api/inviteListGet', {
      method: 'POST',
      body: JSON.stringify({userid: userid}),
      headers: { 
        'Content-Type': 'application/json' 
      }
    })
      .then((data)=>{
        return data.json()
      })
      .then((data)=>{
        console.log('response from InviteListGet')
        console.log(data.invites)
        const response = data.invites;
        const eventNames = [];
        response.forEach((el)=>{
          eventNames.push(el.eventtitle)
        })
        setInviteData(eventNames)
      })
  }, []);


  const handleClickAttend = (eventtitle) => {
    fetch('/api/inviteAttend', {
      method: 'POST',
      body: JSON.stringify({username, eventtitle}),
      headers: { 
        'Content-Type': 'application/json' 
      }
    })
  }

  const handleClickDecline = (eventtitle) => {
    fetch('/api/inviteDecline', {
      method: 'POST',
      body: JSON.stringify({username, eventtitle}),
      headers: { 
        'Content-Type': 'application/json' 
      }
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