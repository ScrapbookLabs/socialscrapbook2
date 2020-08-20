import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'

export default function CoverPhoto(props) {

  const [showHud, setShowHud] = useState(false);

  return (
    <div
      className="coverPhoto"
      onMouseEnter={() => setShowHud(true)}
      onMouseLeave={() => setShowHud(false)}
    >
      {showHud && (<div>
        <div className="hudBackground">
          <FontAwesomeIcon className="newPhotoButton" icon={faArrowCircleUp} />
          <FontAwesomeIcon className="cancelButton" icon={faWindowClose} />
        </div>
      </div>)}
      <img
        src={props.eventpic}
        alt="eventpic"
      />
    </div>
  );
}
