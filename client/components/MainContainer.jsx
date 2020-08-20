import React, { useState, useEffect } from "react";
import Profile from './Profile.jsx';
import EventsFeed from './EventsFeed.jsx';
import Navbar from './Navbar.jsx';
import axios from 'axios';
import { Card, Button, Col, Row, Container, Modal, Form } from 'react-bootstrap';
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
          userid: res.data.users.userid,
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

  // handles delete 
  function handleDeletePhoto(eventtitle, index, url) {
    const lessEvents = events.map(event => { // need to change this for albums (immediate delete)
      if (event.eventtitle === eventtitle) {
        const copy = event.eventphotos.slice();
        console.log(copy)
        copy.splice(index, 1)
        console.log(copy)
        return {...event, eventphotos: copy}
      } else {
        return event;
      }
    });

    const response = axios.delete('/api/photo', {
      data: {
        eventtitle,
        url,
      }
    });

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

  // handles updating photos to existing events
  function handlePhotoUpdate(eventtitle, source) {
    // console.log('got into handle photo update main')
    // const updatedEvents = events.map(event => {
    //   if (event.eventtitle === eventtitle) {
    //     event.eventphotos.push(source);
    //   } else return event
    // });

    // setEvents(updatedEvents);


    axios.put('/api/photo', {
      eventtitle,
      eventpic: source
    })
      .then(data => {
        const insertion = data.data.event;
        const updatedEvents = events.map(event => {
          if (event.eventtitle === eventtitle) {
            return insertion
          } else return event
        });

        setEvents(updatedEvents);
      });
  }

  //changes state once update has occured
  function handleEditEvent (eventtitle, eventdetails, eventlocation, ){
    const editEvent = events.map(event => {
      if (event.eventtitle === oldeventtitle) {
        return {...event,  eventtitle: eventtitle, eventdetails:eventdetails, eventlocation: eventlocation, }
      } else {
        return event;
      }
    });

    setEvents(editEvent);
  }


  return (
    <div className="myContainer">
      <Navbar user={user} loggedIn={loggedIn} profilePhoto={user.profilephoto}/>
      <div className="container">
        <Container className="header">
          {/* <Profile {...user} /> */}
          <AddSearchEvent addEvent={handleCreateEvent} searchEvent={handleSearchEvent} events={events} />
          {/* <Button onClick={handleShow}>DUMMY UPLOAD</Button>
          <Button onClick={handleShoww} >Search By Tag Dummy</Button> */}
        </Container>
        <EventsFeed
          deleteEvent ={deleteEvent}
          events={events}
          editEvent = {handleEditEvent}
          userUpdate={handleUserPageChange}
          deletePhoto={handleDeletePhoto}
          updatePhoto={handlePhotoUpdate}
        />
      </div>
      {/* <Modal show={show} onHide={handleClose} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Add Photo</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>

              <Form.Group controlId="formEventPhoto">
                <Form.Label>Event Photo</Form.Label>
                <Form.Control name='photo' type='file' onChange={handlePhoto}/>
              </Form.Group>

              {previewSource && (
                <img src={previewSource} alt="chosen" style={{height: '300px'}} />
              )}

              <Button variant="primary" type="submit" onClick={(e) => { handleSubmit(e) }}>
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal show={showw} onHide={handleClosee} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Get Photo With Tag</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>

              <Form.Group controlId="formEventPhoto">
                <Form.Label>Use tag</Form.Label>
                <Form.Control name='dummyget' type='text' onChange={handleTag}/>
              </Form.Group>

              {previewSource && (
                <img src={previewSource} alt="chosen" style={{height: '300px'}} />
              )}

              <Button variant="primary" type="submit" onClick={(e) => { handleSubmitt(e) }}>
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal> */}
    </div>
  );
}
