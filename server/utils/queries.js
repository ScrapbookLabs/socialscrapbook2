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


queries.userEvents = `
SELECT * FROM events WHERE userid=$1
`;


// SELECT * FROM invitelist;

// DELETE SPECIFIC EVENTPIC URL FROM EVENT
queries.deletePhoto = `
UPDATE events
SET eventpic = NULL
WHERE eventtitle = $1;
`;

queries.deleteUsersAndEvents = `
DELETE FROM usersandevents WHERE eventid=$1`

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


module.exports = queries;
