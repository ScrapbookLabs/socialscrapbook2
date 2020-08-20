import { Navbar, Nav, Button } from 'react-bootstrap';
import React, { useState, useEffect }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faFeatherAlt, faInbox } from '@fortawesome/free-solid-svg-icons'
import Inbox from './Inbox.jsx'


export default function OurNavbar({ loggedIn, profilePhoto, user }) {

  // use react hook for state to render <Inbox /> conditionally
  const [inbox, setInbox] = useState(false);
  // change state after button click
  const handleClickInbox = () => {
   setInbox(!inbox);
  }


  return (
  <Navbar expand="lg" className="myNavbar justify-content-between">
    <Navbar.Brand className="brand" href="#home"><FontAwesomeIcon icon={faFeatherAlt} /> Social Scrapbook 2.0 </Navbar.Brand>
    <Nav className="justify-content-end">
      {/* When we're not logged in */}
      {!loggedIn && <Nav.Item>
          <a href="/api/login"><Button className="navButton" variant="outline-primary"><FontAwesomeIcon icon={faGoogle} /> Sign Up/Log In</Button></a>
      </Nav.Item>}
      {/* When we're logged in */}
      {loggedIn && <Nav.Item className="profileButton">
          <a href="#home"><img src={profilePhoto} /></a>
      </Nav.Item>}
      {loggedIn && <Nav.Item className="inboxIcon">
          <a><Button className="navButton" variant="outline-primary" onClick={handleClickInbox}><FontAwesomeIcon className="inboxIconSvg" icon={faInbox} /></Button></a>
      </Nav.Item>}
      {loggedIn && <Nav.Item className="logoutButton">
          <a href="/api/logout"><Button className="navButton" variant="outline-primary">Logout</Button></a>
      </Nav.Item>}
      {inbox && <Inbox user={user} />}
    </Nav>
  </Navbar>
  )
}
