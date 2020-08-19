import React, { useState, useEffect } from "react";
import Event from './Event.jsx';

export default function EventsFeed(props) {
  let feedEvents = [];
  //creates events for each event in feed

  if (props.events && props.events.length > 0) {
    feedEvents = props.events.map((event, index) => {
      return <Event
        {...event}
        userUpdate={props.userUpdate}
        deletePhoto={props.deletePhoto}
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
