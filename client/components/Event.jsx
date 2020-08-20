import React, { useState, useEffect } from "react";
import EventAttendees from './EventAttendees.jsx';
import Content from './Content.jsx';
import CoverPhoto from './CoverPhoto.jsx';
import { ListGroup, Container, Row, Jumbotron, Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Invite from './Invite.jsx'
import EditEvent from "./EditEvent.jsx"

export default function Event(props) {

  const [eventpic, setEventpic] = useState('');
  const [inviteView, setInviteView] = useState(false)

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const jsDate = new Date(props.eventdate);
  const jsHours = jsDate.getHours();
  const americanHours = jsHours > 12 ? jsHours - 12 : jsHours;


  const humanReadableDate = `${days[jsDate.getDay()]}, ${months[jsDate.getMonth()]} ${jsDate.getDate()}`;
  const americanTime = `${americanHours}:${jsDate.getMinutes()} ${jsHours > 12 ? "PM" : "AM"}`;

  const handleClickInvite = () => {
    setInviteView(true)
  }

  const [show, setShow] = useState(false);
  const [previewSource, setPreviewSource] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault()
    // ADD PHOTO TO EVENT func
    props.updatePhoto(props.eventtitle, previewSource);
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

  const handleClose = () => {
    setShow(false);
    setPreviewSource('');
  }
  const handleShow = () => setShow(true);

  return (
    <>
      <b className="hr anim"></b>
      <div className="event">
        <Container>
          <div className="eventButtons">
            <EditEvent  {...props} events = {props.events} editEvent = {props.editEvent}/>
            <Button variant="primary" onClick={handleClickInvite}>Invite Friends!</Button>
            <Button variant="outline-primary" className="deleteButton" onClick={()=> props.deleteEvent(props.eventid)}>Delete</Button>
          </div>
          <Jumbotron fluid>
            <Container className='eventJumbotron'>
              <h1>{props.eventtitle}</h1>
              <div className="coverPhotoContainer">
                {props.eventphotos[0] ? (
                  <CoverPhoto deletePhoto={props.deletePhoto} handleShow={handleShow} eventtitle={props.eventtitle} eventphotos={props.eventphotos} />
                ) : (
                  <Button variant="primary" onClick={handleShow} >Add Photo</Button>
                )}
              </div>
              <h4>{humanReadableDate}</h4>
              <h4>Location <FontAwesomeIcon icon={faLocationArrow} size="1x" /> : {props.eventlocation}</h4>
              <p>{props.eventdetails}</p>
            </Container>
          </Jumbotron>

          <Container>
            <EventAttendees
              {...props}
              userUpdate={props.userUpdate}
            />
          </Container>
          <Content {...props} />
        </Container>

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
      </div>
      {inviteView && <Invite eventtitle={props.eventtitle} event={props.event} setInviteView={setInviteView}/>}
    </>
  );
}
