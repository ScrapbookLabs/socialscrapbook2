import React, { useState, useEffect } from "react";
import Profile from './Profile.jsx';
import EventsFeed from './EventsFeed.jsx';
import Navbar from './Navbar.jsx';
import axios from 'axios';
import { Card, Button, Col, Row, Container } from 'react-bootstrap';
import AddSearchEvent from './AddSearchEvent.jsx';

// Implemented with hooks throughout
export default function MainContainer() {

  const [userName, setUserName] = useState("");
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  // pull user data after OAuth login - all variables are named from SQL DB columns
  useEffect(() => {
    axios.get(`/api/info?userName=${userName}`)
      .then((res) => {
        let userInfo = {
          username: res.data.users.username,
          firstname: res.data.users.firstname,
          lastname: res.data.users.lastname,
          profilephoto: res.data.users.profilephoto,
        }
        let eventsInfo = res.data.events;

        setUser(userInfo);
        setEvents(eventsInfo);
        setUserName(res.data.users.username);
        setLoggedIn(true);
      })
  }, []);
  //updates username when a different user is selected
  function handleUserPageChange(username) {
    setUserName(username);
  }
  //handles the state change and posts to database on event creation
  function handleCreateEvent(event) {
    let { eventtitle, eventlocation, eventdate, eventstarttime, eventdetails, eventpic } = event;
    axios.post(`/api/create?userName=${userName}`, { eventtitle, eventlocation, eventdate, eventstarttime, eventdetails, eventpic })
      .then((res) => {
        event.attendees = [{
          username: user.username,
          profilephoto: user.profilephoto
        }];
        event.eventid = res.data.newEvent.eventid;
        const newEvents = [event].concat(events);
        setEvents(newEvents);
      })
  }
  //handles the state change and posts to database on search event add
  function handleSearchEvent(event) {
    // ADD
    axios.post(`/api/add?eventtitle=${event.eventtitle}`)
      .then((res) => {
        event.attendees.push(
          {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            profilephoto: user.profilephoto
          });
        const newEvents = [event].concat(events);
        setEvents(newEvents);
      })
  }

  function handleDeletePhoto(eventtitle) {
    const lessEvents = events.map(event => {
      if (event.eventtitle === eventtitle) {
        return {...event, eventpic: null}
      } else {
        return event;
      }
    });

    const response = axios.delete('/api/photo', {
      data: {
        eventtitle: eventtitle,
      }
    });

    console.log('main container response', response)

    setEvents(lessEvents);
  }
  // Delete Buttons for individual events

  // function handleDeleteEvent(id){
  //   const 
  // }


  const deleteEvent = async (id) => {
    try{

     console.log("THIS is the id youre deleting"+ id)
      const deleteEvent = await fetch(`api/events/${id}`, {
        method: "DELETE",
      })
      console.log(deleteEvent) 
      setEvents(events.filter(event => event.eventid !== id))
    }
    catch(err){
     console.error(err.message)
    } 
  }


  return (
    <div className="myContainer">
      <Navbar loggedIn={loggedIn} profilePhoto={user.profilephoto}/>
      <div className="container">
        <Container className="header">
          {/* <Profile {...user} /> */}
          <AddSearchEvent addEvent={handleCreateEvent} searchEvent={handleSearchEvent} events={events} />
        </Container>
        <EventsFeed
          deleteEvent ={deleteEvent}
          events={events}
          userUpdate={handleUserPageChange}
          deletePhoto={handleDeletePhoto}
        />
      </div>
    </div>
  );
}
