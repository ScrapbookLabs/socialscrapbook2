import React, { useState, useEffect } from "react";

export default function Invite(props) {
  // try to autofill? 
  // or get a list of all your friends and then see which to invite? Could add scroll bar with friends
    
  // "friendsFetchRes" is dummy for 'get' fetch to get your friends list from database
  const friendsFetchRes = ['friend1', 'friend2', 'friend3']

  const handleClickInvite = () =>{
  // send a 'post' fetch to the server with req.body containing the friend name 
  // either remove friend from the inviteScrollContainer or change color of the invite button to green and say "invited"
  }

  const friendsList = friendsFetchRes.map((el)=>{
    return (
      <div className='inviteFriendContainer'>
        <span className='inviteFriendPhoto'>Photo</span>
        <span className='inviteFriendName'>{el}</span>
        <span className='inviteFriendButton'>
          <button onClick={handleClickInvite}>Invite</button>
        </span>
      </div>
    )
  })

  // need to create a div that holds all friends inside (probably use scroll bar)
  return (
    <div className='inviteContainer'>
      <h1 id='inviteHeader'>Invite Friends to your Event</h1>
      <div className='inviteScrollContainer'>
        {friendsList}
      </div>
    </div>
  )
}
