const db = require("../models/models");
const queries = require("../utils/queries");

const { cloudinary } = require('../utils/cloudinary.js');

const photoController = {};

photoController.uploadPhoto = (req, res, next) => {
  if (!req.body.eventpic) {
    return next();
  }

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

// UPLOADS PHOTO TO CLOUDINARY WITH TAG ATTACHED
photoController.uploadDummyPhoto = (req, res, next) => {
  if (!req.body.eventpic) {
    return next();
  }

  try {
    const fileStr = req.body.eventpic;
    const { eventtitle } = req.body;

    cloudinary.uploader.upload(fileStr, { upload_preset: 'social_scrapbook_2', tags: [eventtitle] }, function(err, result) {
      console.log('upload result with tags?? ', result)
      res.locals.photoUrl = result.url;
      return next();
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({msg: 'Photo upload went wrong in api router middleware!'})
  }
}

// ADDS TO NEW JOIN TABLE FOR EVENT PHOTOS
photoController.addDummyToSQL = (req, res, next) => {
  const { eventtitle } = req.body;
  const { photoUrl } = res.locals;

  const queryString = queries.addDummyPhoto;
  const queryValues = [eventtitle, photoUrl];

  db.query(queryString, queryValues)
    .then(data => {
      console.log('response from sql when adding photo to join ', data);
    })
    
  return next();
}

// GETS PHOTO BY TAG FROM CLOUDINARY
photoController.getDummyPhotoByTag = (req, res, next) => {
  // const { eventtitle } = req.body;
  const { tag } = req.params;
  console.log('tag came through on back end ', tag)

  cloudinary.search
    .expression(`tags=${tag}`)
    .execute()
    .then(result => {
      console.log('back end response from tag search ', result.resources)
      res.locals.photoUrl = result.resources[0].url;
      return next();
    })
    .catch(err => {
      console.log(err);
      return next({err: "Error in photoController.getPhoto"})
    });
}

//GET PHOTOS FROM JOIN TABLE IN EVENTPHOTOS BY EVENT
photoController.getDummyPhotosSQL = (req, res, next) => {
  const { tag } = req.params;

  const queryString = queries.getDummyPhotos;
  const queryValues = [tag];

  db.query(queryString, queryValues)
    .then(result => {
      console.log('result from db photos ! ', result.rows);
      res.locals.photoUrl = result.rows;
      return next();
    })
}



module.exports = photoController;
