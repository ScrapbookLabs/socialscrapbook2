import React, { useState, useEffect } from "react";

export default function Inbox(props) {
    // "eventsFetchRes" is dummy for fetch to the pending events table 
    const eventsFetchRes = ['event1', 'event2', 'event3']
    if (!eventsFetchRes) {
        return (
            <div>
                There are no pending events
            </div>
        )
    } else {
        const eventList = eventsFetchRes.map((el)=>{
            return (
                <div>
                    <span>add event photo</span>
                    <span>Event Name: </span>
                    <span>{el}</span>
                </div>
            )
        })
        return (
            <div>
                {eventList}
            </div>
        )
    }
  }