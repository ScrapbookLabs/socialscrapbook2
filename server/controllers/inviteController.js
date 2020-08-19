const db = require("../models/models");
const queries = require("../utils/queries");
const { getAllUsers } = require("../utils/queries");
const inviteController = {};

inviteController.userList = (req, res, next) => {
  db.query(getAllUsers)
  .then((data)=>{
    if (!data.rows[0]) {
      res.locals.invite = [];
    } else {
      res.locals.invite = data.rows
    }
  })
} 