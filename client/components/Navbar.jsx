import { Navbar, Nav, Button } from 'react-bootstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faFeatherAlt, faInbox } from '@fortawesome/free-solid-svg-icons'

export default function OurNavbar({ loggedIn, profilePhoto }) {
  return (
  <Navbar expand="lg" className="myNavbar justify-content-between">
    <Navbar.Brand className="brand" href="#home"><FontAwesomeIcon icon={faFeatherAlt} /> Social Scrapbook </Navbar.Brand>
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
          <a href="#home"><Button className="navButton" variant="outline-primary"><FontAwesomeIcon className="inboxIconSvg" icon={faInbox} /></Button></a>
      </Nav.Item>}
      {loggedIn && <Nav.Item className="logoutButton">
          <a href="/api/logout"><Button className="navButton" variant="outline-primary">Logout</Button></a>
      </Nav.Item>}
    </Nav>
  </Navbar>
  )
}
