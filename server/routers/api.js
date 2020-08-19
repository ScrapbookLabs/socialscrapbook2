const express = require("express");
const router = express.Router();
const path = require('path');
const fileController = require('../controllers/fileController');
const cookieController = require('../controllers/cookieController');
const eventController = require('../controllers/eventController');
const loginController = require('../controllers/loginController');
const inviteController = require('../controllers/inviteController');


const { cloudinary } = require('../utils/cloudinary.js');

// EXISING USER LOGIN

router.get('/login',
  loginController.oAuth,
  (req, res) => {
    // res.send('ok');
    return res.redirect(res.locals.url)
  });

router.get('/login/google',
  loginController.afterConsent,
  cookieController.setSSIDCookie,
  fileController.createUser, // if username already exists, return next() => getUser // if not, create user in SQL database
  // fileController.getUser,
  // eventController.getFullEvents,
  (req, res) => {
    // const responseObj = {
    //   users: res.locals.allUserInfo,
    //   events: res.locals.allEventsInfo
    // };
    return res.redirect('http://localhost:8080/')
  });

// REVISIT WEBSITE AFTER LEAVING, OR VISITING SOMEONE ELSE'S PROFILE PAGE

router.get('/info',
  cookieController.isLoggedIn, // this is really only is applicable for the same user
  fileController.getUser,
  eventController.allEvents,
  eventController.filterForUser,
  // eventController.getFullEvents,   //ALL COMMENTED OUT OBSOLETE - KEPT IN CASE NEEDED LATER - REPLACED BY .allEvents and .filterForUser
  // eventController.getAllAttendees,
  // eventController.getUserDetail,
  // eventController.consolidation,
  (req, res) => {
    const responseObj = {
      users: res.locals.allUserInfo,
      events: res.locals.allEventsInfo,
    };
    console.log('responseObj: ', responseObj);
    return res.status(200).json(responseObj);
  });

// LOGGING OUT

router.use('/logout', // SWITCH THIS TO POST REQUEST!!
  cookieController.removeCookie,
  (req, res) => {
    return res.redirect('/');
  });

// CREATE A NEW EVENT

router.post('/create',
  fileController.verifyUser,
  fileController.getUser,
  eventController.createEvent,
  eventController.addNewEventToJoinTable,
  (req, res) => {
    return res.status(200).json('Event succcessfully created.');
  });

// ADD USER TO AN EXISTING EVENT

router.post('/add',
  fileController.getUser,
  eventController.verifyAttendee,
  eventController.addAttendee,
  (req, res) => {
    return res.status(200).json('User successfully added as attendee.');
  });

router.get('/events', // SWITCH THIS TO A GET REQUEST!!
  eventController.allEvents,
  (req, res) => {
    return res.status(200).json(res.locals.allEventsInfo);
  }
)

// UPLOAD A PHOTO TO CLOUDINARY API

router.post('/photo', async (req, res, next) => {
  try {
    const fileStr = req.body.data;
    const { eventtitle } = req.body;

    const uploadedResponse = await cloudinary.uploader.upload(fileStr, { upload_preset: 'social_scrapbook_2', public_id: `${eventtitle}`});

    return res.status(200).json(uploadedResponse)
  } catch (err) {
    console.log(err);
    return res.status(400).json({msg: 'Photo upload went wrong in api router middleware!'})
  }
})

// FETCH SPECIFIC PHOTO FROM CLOUDINARY API

router.get('/photo', async (req, res, next) => {
  const eventtitle = req.query.title;
  const { resources } = await cloudinary.search
    .expression(`public_id: social_scrapbook_2/${eventtitle}`)
    .execute();

  res.status(200).json(resources[0]);
})

// DELETE PHOTO FROM CLOUDINARY API

router.delete('/photo', async (req, res, next) => {
  const eventtitle = req.body.eventtitle;
  console.log('make sure title', eventtitle)

  const response = await cloudinary.uploader.destroy(`social_scrapbook_2/${eventtitle}`);

  console.log('delete router response ', response)

  res.status(200).json(response);
})

// FETCH ALL PHOTOS FROM CLOUDINARY API

router.get('/allphotos', async (req, res, next) => {
  const { resources } = await cloudinary.search
    .expression('folder: social_scrapbook_2')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();
  const publicIds = resources.map(file => file.public_id);

  res.status(200).json({ ids: publicIds });
})

// GET ALL USERS FOR INVITE LIST

router.get('/invite', inviteController.userList, (req, res) =>{
  res.status(202).json({users: res.locals.invite})
})


module.exports = router;
