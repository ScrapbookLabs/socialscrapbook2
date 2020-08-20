const db = require("../models/models");
const { getAllUsers } = require("../utils/queries");
const { addInvite } = require("../utils/queries");
const queries = require("../utils/queries");
const inviteController = {};

inviteController.userList = (req, res, next) => {
  db.query(getAllUsers)
  .then((data)=>{
    if (!data.rows[0]) {
      res.locals.invite = [];
    } else {
      console.log('DATA ROWS FROM ALL USERS')
      console.log(data.rows)
      res.locals.invite = data.rows
    }
    next();
  })
  .catch((err)=>{
    console.log('err', err);
  })
}

inviteController.pendingInvites = (req, res, next) => {
  const { eventtitle } = req.body;

  const queryString = queries.inviteListEventGet;
  const queryValues = [eventtitle];

  db.query(queryString, queryValues)
    .then(data => {
      console.log(data.rows);
      res.locals.pendingInvites = data.rows;
      return next();
    })
    .catch(err => {
      return next({
        log: `Error occurred with queries.inviteListEventGet OR inviteController.pendingInvites middleware: ${err}`,
        message: { err: "An error occured within request to get one event from SQL." },
      });
    })
}

inviteController.filterUsers = async (req, res, next) => {
  res.locals.availableUsers = await res.locals.invite.filter(user => {
    for (let attendee of res.locals.thisEventAttendees) {
      if (Number(attendee.userid) === user.userid) {
        return false;
      }
    }
    for (let invitee of res.locals.pendingInvites) {
      if (Number(invitee.userid) === user.userid) {
        return false;
      }
    }
    return true;
  })
  return next();
}

inviteController.newInvite = (req, res, next) => {
  let {userid, username, eventid, eventtitle, eventdate, eventstarttime, eventendtime, eventdetails, eventlocation} = req.body
  let values = [userid, username, eventid, eventtitle, eventdate, eventstarttime, eventendtime, eventdetails, eventlocation];
  db.query(addInvite, values)
    .then((data)=>{
      console.log(data)
    })
}

inviteController.inviteListGet = (req, res, next) => {
  let {userid} = req.body
  let values = [userid];
  db.query(queries.inviteListGet, values)
    .then((data)=>{
      console.log(data.rows)
      console.log('got all users invites')
      res.locals.data = data.rows;
      next()
    })
}


inviteController.getDatafromInvite = (req, res, next) => {
  let {username, eventtitle} = req.body;
  // do a query to get the relevant data from invite table, and then add said data to the eventsandusers
  let values = [username, eventtitle];
  db.query(queries.inviteListGetOne, values)
    .then((data)=>{
      console.log(data.rows[0])
      console.log('got all data from specific event to response')
      res.locals.data = data.rows[0];
      next()
    })
}

inviteController.addInvitetoEvents = (req, res, next) => {
  let {userid, username, eventid, eventtitle, eventdate, eventstarttime, eventendtime, eventdetails, eventlocation} = res.locals.data
  console.log('GOT DATABACK FROM INVITELIST GETONE')
  let values = [userid, username, eventid, eventtitle, eventdate, eventstarttime, eventstarttime, eventdetails, eventlocation];
  
  db.query(queries.addUserToEvent, values)
    .then((data)=>{
      next()
    })
}

inviteController.removeFromInvite = (req, res, next) => {
  let {username, eventtitle} = req.body;
  let values = [username, eventtitle];
  
  db.query(queries.inviteListRemove, values)
    .then((data)=>{
      next()
    })
}




module.exports = inviteController;
