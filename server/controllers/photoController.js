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

photoController.deleteCloudinary = async (req, res, next) => {
  const { eventtitle } = req.body;

  const response = await cloudinary.uploader.destroy(`social_scrapbook_2/${eventtitle}`);

  res.locals.cloudresponse = response;
  return next();
}

photoController.deleteFromSQL = (req, res, next) => {
  const { eventtitle } = req.body;
  const queryString = queries.deletePhoto;
  const queryValues = [eventtitle];

  db.query(queryString, queryValues)
    .then(data => {
      return next();
    })
    .catch(err => {
      return next({
        log: `Error occurred with queries.deletePhoto OR photoController.deleteFromSQL middleware: ${err}`,
        message: { err: "An error occured with SQL when retrieving events information." },
      });
    })
}

module.exports = photoController;
