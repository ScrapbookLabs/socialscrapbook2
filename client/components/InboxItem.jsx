import React, { useState, useEffect } from "react";
import axios from "axios";

export default function InboxItem(props) {
    
  const [showItem, setshowItem] = useState(true);
  const username = props.username

  const handleClickAttend = (eventtitle) => {
    axios.post('/api/inviteAttend', {
      username, eventtitle
    })
    setshowItem(false)
  }

  const handleClickDecline = (eventtitle) => {
    axios.post('/api/inviteDecline', {
      username, eventtitle
    })
    setshowItem(false)
  }
    
  return (
    <div>
      {showItem && 
        <div key={props.i} className='inboxItem'>
          <div className='inboxDetails'>
            {/* <span className='inboxItemPhoto'>add event photo </span> */}
            <span className='inboxItemEventNameTitle'>Event Name: </span>
            <span className='inboxItemEventName'>{props.el}</span>
          </div>
          <div className='inboxButtons'>
            <span>
              <button className="inboxSubmitAttend" onClick={()=>{handleClickAttend(props.el)}}>Attend</button>
            </span>
            <span>
              <button className="inboxSubmitDecline" onClick={()=>{handleClickDecline(props.el)}}>Decline</button>
            </span>
          </div>
      </div>
    }
  </div>
)

}