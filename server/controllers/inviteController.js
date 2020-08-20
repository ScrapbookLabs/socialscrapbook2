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

// inviteController.InviteList = (req, res, next) => {
//   let {username} = req.body
//   let values = [username];
//   db.query(addInvite, values)
//     .then((data)=>{
//       console.log(data)
//       console.log('adding to invite table working')
//     })
// } 

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


module.exports = inviteController;