import React, { useState, useEffect } from "react";
import Event from './Event.jsx';
import axios from 'axios';

export default function EventsFeed(props) {
  let feedEvents = [];
  //creates events for each event in feed

  if (props.events && props.events.length > 0) {
    feedEvents = props.events.map((event, index) => {
      return <Event
        {...event}
        events = {props.events}
        editEvent = {props.editEvent}
        deleteEvent = {props.deleteEvent}
        userUpdate={props.userUpdate}
        deletePhoto={props.deletePhoto}
        event={props.events[index]}
        updatePhoto={props.updatePhoto}
        key={`EventsFeed${index}`}
      />
    })
  }


  return (
    <div className="events">
      {feedEvents}
    </div>
  );
}
