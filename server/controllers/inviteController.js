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
    next()
  })
  .catch((err)=>{
    console.log('err', err)
  })
} 

inviteController.newInvite = (req, res, next) => {
  let {userid, username, eventid, eventtitle, eventdate, eventstarttime, eventendtime, eventdetails, eventlocation} = req.body
  let values = [userid, username, eventid, eventtitle, eventdate, eventstarttime, eventendtime, eventdetails, eventlocation];
  db.query(addInvite, values)
    .then((data)=>{
      console.log(data)
      console.log('adding to invite table working')
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