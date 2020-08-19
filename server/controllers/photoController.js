const db = require("../models/models");
const queries = require("../utils/queries");

const { cloudinary } = require('../utils/cloudinary.js');

const photoController = {};

photoController.uploadPhoto = (req, res, next) => {
  try {
    const fileStr = req.body.eventpic;
    const { eventtitle } = req.body;

    cloudinary.uploader.upload(fileStr, { upload_preset: 'social_scrapbook_2', public_id: `${eventtitle}`}, function(err, result) {
      res.locals.photoUrl = result.url;
      return next();
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({msg: 'Photo upload went wrong in api router middleware!'})
  }
}

photoController.getPhoto = (req, res, next) => {
  const { eventtitle } = req.body;
  console.log(eventtitle);
  cloudinary.search
    .expression(`public_id: social_scrapbook_2/${eventtitle}`)
    .execute()
    .then(result => {
      res.locals.photoUrl = result.resources[0].url;
      return next();
    })
    .catch(err => {
      console.log(err);
      return next({err: "Error in photoController.getPhoto"})
    });
}

module.exports = photoController;
