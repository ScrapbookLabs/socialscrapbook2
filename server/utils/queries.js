const db = require("../models/models.js"); // remove after testing

const queries = {};

// GET ALL EVENTS
queries.getAllEvents = `
SELECT * FROM events
`;


queries.getAttendeeEvents = `
SELECT u.*, ue.eventid
FROM usersandevents ue
JOIN users u
ON u.userid = ue.userid
`;

// GET USER'S EVENTS
queries.userEvents = `
SELECT * FROM usersandevents WHERE userid=$1
`;

// GET ALL USER'S PERSONAL INFO
queries.userInfo = `SELECT * FROM users WHERE username=$1`; // const values = [req.query.id]

// QUERY TO ADD USER
queries.addUser = `
INSERT INTO users
  (username, firstname, lastname, profilephoto)
VALUES($1, $2, $3, $4)
RETURNING username
;
`;

// QUERY FOR WHEN USER CREATES EVENT
queries.createEvent = `
INSERT INTO events
  (eventtitle, eventdate, eventstarttime, eventendtime, eventlocation, eventdetails, eventownerid, eventownerusername, eventmessages, eventpic)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING eventid
;
`;

// QUERY FOR WHEN USER CREATES EVENT WITHOUT PHOTO
queries.createEventWithoutPhoto = `
INSERT INTO events
  (eventtitle, eventdate, eventstarttime, eventendtime, eventlocation, eventdetails, eventownerid, eventownerusername, eventmessages, eventpic)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, NULL)
RETURNING eventid
;
`;

// ADDS ALL CURRENT EVENTS TO USERSANDEVENTS
queries.addNewEventToJoinTable = `
INSERT INTO usersandevents (userid, username, eventid, eventtitle, eventdate, eventstarttime, eventendtime, eventdetails, eventlocation)
SELECT eventownerid, eventownerusername, eventid, eventtitle, eventdate, eventstarttime, eventendtime, eventdetails, eventlocation FROM events
WHERE eventid=$1
RETURNING usersandevents;
`;

// USERS ADDS THEMSELVES TO OTHER PEOPLE'S EVENTS
queries.addUserToEvent = `INSERT INTO usersandevents
  (userid, username, eventid, eventtitle, eventdate, eventstarttime, eventendtime, eventdetails, eventlocation)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING eventid
;
`;

// GRAB EVENT'S ATTENDEES
queries.selectEventAttendees = `SELECT * FROM usersandevents WHERE eventtitle=$1`;

// CLEAR ALL TABLES & DATA
queries.clearAll = `
DROP TABLE usersandevents;
DROP TABLE events;
DROP TABLE users;
`;

// GET ALL USERS
queries.getAllUsers = `
SELECT * FROM users
;
`;

// ADD ENTRY TO INVITE TABLE
queries.addInvite = `
INSERT INTO invitelist
  (userid, username, eventid, eventtitle, eventdate, eventstarttime, eventendtime, eventdetails, eventlocation)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
;
`;

queries.userInvites = `
SELECT * FROM invitelist WHERE username=$1
`;


queries.inviteListGet = `
SELECT * FROM invitelist WHERE userid=$1
`;

queries.inviteListEventGet = `
SELECT * FROM invitelist WHERE eventtitle=$1
`


queries.userEvents = `
SELECT * FROM events WHERE userid=$1
`;

queries.inviteListGetOne = `
SELECT * FROM invitelist WHERE username=$1 AND eventtitle=$2
`;

queries.inviteListRemove = `
DELETE FROM invitelist WHERE username=$1 AND eventtitle=$2
`;

queries.addUserToEventnoEnd = `INSERT INTO usersandevents
  (userid, username, eventid, eventtitle, eventdate, eventstarttime, eventdetails, eventlocation)
VALUES($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING eventid
;
`;

queries.getThisEvent =`
SELECT * FROM events WHERE eventid=$1
`;


// DELETE SPECIFIC EVENTPIC URL FROM EVENT
queries.deletePhoto = `
UPDATE events
SET eventpic = NULL
WHERE eventtitle = $1;
`;

queries.deleteUsersAndEvents = `
DELETE FROM usersandevents WHERE eventid=$1`

queries.deleteInviteUsersAndEvents = `
DELETE FROM invitelist WHERE eventid=$1`

//DELETE FROM EVENTS
 queries.deleteEvent = `
 DELETE FROM events WHERE eventid=$1`

 //GET last id# to fill in
//  queries.getLastID = `
//  SELECT * FROM events WHERE eventid= (SELECT max(eventid) FROM events)`

// UPDATE EVENTPIC IN EVENT
queries.updatePhoto = `
UPDATE events
SET eventpic = $1
WHERE eventtitle = $2;
`;

// GET ONE EVENT BY EVENTTITLE
queries.getOneEvent = `
SELECT * FROM events
WHERE eventtitle = $1;
`;
//Update EventPhotos -Darwin
queries.updateEventPhotos =
`UPDATE eventphotos SET eventtitle =$1 WHERE eventtitle = $2`

queries.updateUsersAndEvents = 
`UPDATE usersandevents SET eventtitle =$1, eventdetails =$2, eventlocation =$3 WHERE eventid = $4`

//EDIT FROM EVENTS

queries.updateEvents = 
`UPDATE events SET eventtitle = $1, eventdetails =$2, eventlocation =$3 WHERE eventid = $4 `

// ADD PHOTO TO EVENTPHOTOS
queries.addDummyPhoto = `
INSERT INTO eventphotos
  (eventtitle, eventpic)
VALUES($1, $2);
`;

// GET PHOTOS FROM EVENTPHOTOS
queries.getDummyPhotos = `
SELECT eventpic
FROM eventphotos
WHERE eventtitle = $1;
`;

// GET ALL PHOTOS FROM EVENTPHOTOS
queries.getAllPhotos = `
SELECT * FROM eventphotos;
`;

//DELETE SPECIFIC PHOTO FROM EVENTPHOTOS
queries.deleteSQLPhoto = `
DELETE FROM eventphotos
WHERE eventpic = $1;
`;


// ADD PHOTO TO EVENTPHOTOS
queries.addDummyPhoto = `
INSERT INTO eventphotos
  (eventtitle, eventpic)
VALUES($1, $2);
`;

// GET PHOTOS FROM EVENTPHOTOS
queries.getDummyPhotos = `
SELECT eventpic
FROM eventphotos
WHERE eventtitle = $1;
`;

// GET ALL PHOTOS FROM EVENTPHOTOS
queries.getAllPhotos = `
SELECT * FROM eventphotos;
`;

//DELETE SPECIFIC PHOTO FROM EVENTPHOTOS
queries.deleteSQLPhoto = `
DELETE FROM eventphotos
WHERE eventpic = $1;
`;

module.exports = queries;
