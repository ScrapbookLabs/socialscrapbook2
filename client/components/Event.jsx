import React, { useState, useEffect } from "react";
import EventAttendees from './EventAttendees.jsx';
import Content from './Content.jsx';
import CoverPhoto from './CoverPhoto.jsx';
import { ListGroup, Container, Row, Jumbotron } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Invite from './Invite.jsx'

export default function Event(props) {

  const [eventpic, setEventpic] = useState('');
  const [inviteView, setInviteView] = useState(false)

  useEffect(() => {
    axios.get(`/api/photo?title=${props.eventtitle}`)
      .then((res) => {
        if (res.data) {
          setEventpic(res.data.url);
        }
    })
  }, [])

  const handleClickInvite = () => {
    setInviteView(!inviteView)
  }

  return (
    <>
      <b className="hr anim"></b>
      <div className="event">
        <Container>
          <button onClick={handleClickInvite}>Invite Friends</button>
          <Jumbotron fluid>
            <Container className='eventJumbotron'>
              <h1>{props.eventtitle}</h1>
              {props.eventpic && (
                <CoverPhoto eventpic={props.eventpic} />
              )}
              {eventpic && (
                <CoverPhoto eventpic={eventpic} />
              )}
              <h4>{props.eventdate} - {props.starttime}</h4>
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
      </div>
      {inviteView && <Invite />}
    </>
  );
}
