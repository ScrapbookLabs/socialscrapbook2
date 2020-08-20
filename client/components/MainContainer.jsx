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
  function handleDeletePhoto(eventtitle, url) {
    const lessEvents = events.map(event => {
      if (event.eventtitle === eventtitle) {
        return {...event, eventpic: null}
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





  const [show, setShow] = useState(false);
  const [showw, setShoww] = useState(false);
  const [tag, setTag] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    // DUMMY
    const faketitle = 'aa';

    axios.post('/api/dummy', { eventpic: previewSource, eventtitle: faketitle })
      .then(response => {
        console.log('response on front end from all back end stuff ', response.data)
      })
    
    handleClose();
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  const handleTag = (e) => {
    setTag(e.target.value);
  }

  const handleSubmitt = (e) => {
    console.log('heyyyyy got in submitt')
    e.preventDefault()

    axios.get(`/api/dummy/${tag}`)
      .then(response => {
        console.log('tag search response front end ', response.data)
      })
      .catch(err => {
        console.log('oh no ', err)
      })

    handleClosee();
  }

  const handleClose = () => {
    setShow(false);
    setPreviewSource('');
  }
  const handleShow = () => setShow(true);

  const handleClosee = () => {
    setShoww(false);
    // setPreviewSource('');
  }
  const handleShoww = () => setShoww(true);


  return (
    <div className="myContainer">
      <Navbar user={user} loggedIn={loggedIn} profilePhoto={user.profilephoto}/>
      <div className="container">
        <Container className="header">
          {/* <Profile {...user} /> */}
          <AddSearchEvent addEvent={handleCreateEvent} searchEvent={handleSearchEvent} events={events} />
          <Button onClick={handleShow}>DUMMY UPLOAD</Button>
          <Button onClick={handleShoww} >Search By Tag Dummy</Button>
        </Container>
        <EventsFeed
          deleteEvent ={deleteEvent}
          events={events}
          userUpdate={handleUserPageChange}
          deletePhoto={handleDeletePhoto}
          updatePhoto={handlePhotoUpdate}
        />
      </div>
      <Modal show={show} onHide={handleClose} animation={true}>
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
        </Modal>
    </div>
  );
}
