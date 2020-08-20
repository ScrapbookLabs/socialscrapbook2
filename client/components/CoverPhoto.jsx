import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faArrowCircleUp, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

export default function CoverPhoto(props) {

  const [showHud, setShowHud] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  function nextPhoto() {
    if (props.eventphotos[photoIndex + 1]) {
      setPhotoIndex(photoIndex+1);
    }
  }

  function prevPhoto() {
    if (props.eventphotos[photoIndex - 1]) {
      setPhotoIndex(photoIndex - 1);
    }
  }

  return (
    <div
      className="coverPhoto"
      onMouseEnter={() => setShowHud(true)}
      onMouseLeave={() => setShowHud(false)}
    >
      {showHud && (<div>
        <div className="hudBackground">
          <FontAwesomeIcon className="newPhotoButton" icon={faArrowCircleUp} onClick={props.handleShow}/>
          <FontAwesomeIcon className="leftPhotoButton" icon={faChevronLeft} onClick={prevPhoto}/>
          <FontAwesomeIcon className="rightPhotoButton" icon={faChevronRight} onClick={nextPhoto}/>
          <FontAwesomeIcon
          className="cancelButton"
          icon={faWindowClose}
          onClick={() => {
            prevPhoto();
            props.deletePhoto(props.eventtitle, photoIndex, props.eventphotos[photoIndex]);
          }}
          />
        </div>
      </div>)}
      <img
        src={props.eventphotos[photoIndex]}
        alt="eventpic"
      />
    </div>
  );
}
