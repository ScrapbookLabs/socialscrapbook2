import React, { useState, useEffect } from "react";

import DateTimePicker from 'react-datetime-picker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';

export default function SearchEvent({ searchEvent, events }) {
  /* Form data */
  const initialFormData = Object.freeze({
    title: "",
    description: ""
  });

  const [formData, updateFormData] = React.useState(initialFormData);
  const [results, updateResults] = useState([]);
  const [show, setShow] = useState(false);
  const [eventData, setEventData] = useState([]);

  //filters list of events as the user types in
  const handleChange = (e) => {
    const regex = new RegExp(e.target.value.trim(), "gi");
    const userEventTitles = events.map(event => event.eventtitle)
    updateResults(eventData.filter((event) => event.eventtitle.match(regex) && !userEventTitles.includes(event.eventtitle)))
    console.log(eventData);
  };
  //pass the added search event back to the main container
  const handleSubmit = (e, event) => {
    e.preventDefault();
    searchEvent(event);
    handleClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    // Grabs all events from database
    axios.get('/api/events')
      .then(res => {
        setEventData(res.data);
      })
    setShow(true);
  }

  //generates a list of events on load using fetch
  const btnResults = results.map(event => {
    return (
      <Button className="searchResult" key={event.eventid} variant="primary" type="submit" onClick={(e) => { handleSubmit(e, event) }}>{event.eventtitle}</Button>
    );
  })



  return (
    <div>
      <div className='cardContainer' onClick={handleShow}>
        <FontAwesomeIcon className="mx-auto faSearchPlus" icon={faSearchPlus} size="4x" />
        <p>Search Events</p>
      </div>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Search for an Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formEventTitle">
              <Form.Label>Please enter the event name below.</Form.Label>
              <Form.Control name='title' onChange={handleChange} required type="text" placeholder="Enter title" />
            </Form.Group>
            <div className='searchResults'>
              {btnResults}

            </div>

          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
