import React, { useState, useEffect } from "react";

import DateTimePicker from 'react-datetime-picker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearchPlus } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, Form, Card } from 'react-bootstrap';
import regeneratorRuntime from "regenerator-runtime";
import Invite from "./Invite.jsx";

// import FormData from 'form-data';

export default function CreateEvent({ addEvent }) {
  /* Form data */
  const initialFormData = Object.freeze({
    eventtitle: "",
    eventlocation: "",
    eventdetails: "",
  });

  const [formData, updateFormData] = React.useState(initialFormData);
  const [dateTime, onChange] = useState(new Date());
  const [show, setShow] = useState(false);
  const [invite, setInvite] = useState(false);


  const [previewSource, setPreviewSource] = useState('');

  //handles any change tot he form and updates the state
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };
  //handles submit event - create date and time and append to the event object
  const handleSubmit = (e) => {
    e.preventDefault()
    const eventdate = dateTime.toDateString();
    let time = dateTime.toTimeString();
    let eventstarttime = time.split(" ")[0];
    // ... submit to API or something
    addEvent({ ...formData, eventdate, eventstarttime, eventpic: previewSource });
    handleClose();
    setInvite(true)
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    // previewFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //   }
  // }


  // const uploadImage = async (base64EncodedImage) => {
  //   try {
  //     await fetch('/api/photo', {
  //       method: 'POST',
  //       body: JSON.stringify({ data: base64EncodedImage, eventtitle: formData.eventtitle}),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }





  const handleClose = () => {
    setShow(false);
    setPreviewSource('');
  }
  const handleShow = () => {
    setShow(true)
    setInvite(false)
  };



  return (
    <div>

      <div className='cardContainer' onClick={handleShow}>
        <FontAwesomeIcon className="mx-auto faPlus" icon={faPlus} size="4x" />
        <p>Add Event</p>
      </div>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formEventTitle">
              <Form.Label>Event Title</Form.Label>
              <Form.Control name='eventtitle' onChange={handleChange} required type="text" placeholder="Enter title" />
            </Form.Group>

            <Form.Group controlId="formEventLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control name='eventlocation' onChange={handleChange} required type="text" placeholder="Enter location" />
            </Form.Group>

            <Form.Group controlId="formEventDescription">
              <Form.Label>Event Description</Form.Label>
              <Form.Control name='eventdetails' onChange={handleChange} required as="textarea" placeholder="Enter description" />
            </Form.Group>

            <Form.Group controlId="formEventPhoto">
              <Form.Label>Event Photo</Form.Label>
              <Form.Control name='photo' type='file' onChange={handlePhoto}/>
            </Form.Group>

            {previewSource && (
              <div className="photoPreviewContainer">
                <img src={previewSource} alt="chosen" style={{width: '300px'}} />
              </div>
            )}

            <Form.Group controlId="formEventDescription">
              <Form.Label>Start Date & Time</Form.Label>
              <DateTimePicker
                className="timePicker"
                onChange={onChange}
                value={dateTime}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => { handleSubmit(e) }}>
              Submit
            </Button>


          </Form>
        </Modal.Body>
      </Modal>
      {/* {invite && <Invite />} */}
    </div>
  );
}
