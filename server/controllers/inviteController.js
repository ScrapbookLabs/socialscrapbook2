const db = require("../models/models");
const { getAllUsers } = require("../utils/queries");
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

module.exports = inviteController;