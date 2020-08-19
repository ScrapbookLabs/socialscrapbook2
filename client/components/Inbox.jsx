import React, { useState, useEffect } from "react";

export default function Inbox(props) {
  // "eventsFetchRes" is dummy for 'get' fetch to the pending events table 
  const eventsFetchRes = ['event1', 'event2', 'event3']
    
  let eventResponse;
  const inviteRes = (response) => {
  // 'post' fetch to database with req.body containing event details and req.body.response = 'response' 
  }

  const handleClickAttend = () => {
    eventResponse = 'yes';
    inviteRes(eventResponse);
  }

  const handleClickDecline = () => {
    eventResponse = 'no';
    inviteRes(eventResponse);
  }
    
  if (!eventsFetchRes) {
    return (
      <div>
        There are no pending events
      </div>
    )
  } else {
    const eventList = eventsFetchRes.map((el, i)=>{
      return (
        <div key={i} className='inboxItem'>
          <span className='inboxItemPhoto'>add event photo</span>
          <span className='inboxItemEventNameTitle'>Event Name: </span>
          <span className='inboxItemEventName'>{el}</span>
          <span>
            <button className="inboxSubmitAttend" onClick={handleClickAttend}>Attend</button>
          </span>
          <span>
            <button className="inboxSubmitDecline" onClick={handleClickDecline}>Decline</button>
          </span>
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