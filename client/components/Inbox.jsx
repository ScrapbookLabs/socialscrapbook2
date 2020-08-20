import React, { useState, useEffect } from "react";
import axios from "axios";
import InboxItem from './InboxItem.jsx'

export default function Inbox(props) {
  const {username, userid} = props.user
  
  const [inviteData, setInviteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviteIndexShow, setinviteIndexShow] = useState([]);

  useEffect(() => {
    axios.post('/api/inviteListGet', {
      userid: userid
    })
      .then((res)=>{
        console.log('response from InviteListGet')
        console.log(res.data.invites)
        const response = res.data.invites;
        const eventNames = [];
        const eventView = [];
        response.forEach((el)=>{
          eventNames.push(el.eventtitle)
          eventView.push(true)
        })
        setLoading(false)
        setInviteData(eventNames);
        setinviteIndexShow(eventView);
      })
  }, []);

  // const handleClickAttend = (eventtitle, index) => {
  //   if (inviteIndexShow[index]) {
  //     axios.post('/api/inviteAttend', {
  //       username, eventtitle
  //     })
  //     inviteIndexShow[index] = false;
  //     setinviteIndexShow(inviteIndexShow)
  //   } else {
  //     alert('already clicked')
  //   }
    
  // }

  // const handleClickDecline = (eventtitle, index) => {
  //   axios.post('/api/inviteDecline', {
  //     username, eventtitle
  //   })
  // }
    
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
        // <div key={i} className='inboxItem'>
        //     <div className='inboxDetails'>
        //       {/* <span className='inboxItemPhoto'>add event photo </span> */}
        //       <span className='inboxItemEventNameTitle'>Event Name: </span>
        //       <span className='inboxItemEventName'>{el}</span>
        //     </div>
        //     <div className='inboxButtons'>
        //       <span>
        //         <button className="inboxSubmitAttend" onClick={()=>{handleClickAttend(el, i)}}>Attend</button>
        //       </span>
        //       <span>
        //         <button className="inboxSubmitDecline" onClick={()=>{handleClickDecline(el, i)}}>Decline</button>
        //       </span>
        //     </div>
        // </div>
      )
    })
    return (
      <div className='inboxContainer'>
        {inviteData[0] && eventList}
        {!inviteData[0] && 
          <div>There are no pending invitations</div>
        }
      </div>
    )
  }
}