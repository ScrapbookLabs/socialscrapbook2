const express = require("express");
const router = express.Router();
const path = require('path');
const fileController = require('../controllers/fileController');
const cookieController = require('../controllers/cookieController');
const eventController = require('../controllers/eventController');
const loginController = require('../controllers/loginController');
const inviteController = require('../controllers/inviteController');

const photoController = require('../controllers/photoController');

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
  // photoController.uploadPhoto,
  photoController.uploadDummyPhoto,
  fileController.verifyUser,
  fileController.getUser,
  eventController.createEvent,
  eventController.addNewEventToJoinTable,
  photoController.addDummyToSQL,
  (req, res) => {
    return res.status(200).json({newEvent: res.locals.newEvent, eventpic: res.locals.photoUrl});
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

router.post('/photo',
  // photoController.uploadPhoto,
  photoController.uploadDummyPhoto,
  (req, res, next) => {
    return res.status(200).json(res.locals.eventpic)
  }
)

// FETCH SPECIFIC PHOTO FROM CLOUDINARY API

router.get('/photo',
  photoController.getPhoto,
  (req, res, next) => {
    res.status(200).json(res.locals.photoUrl);
  }
)

// DELETE PHOTO FROM CLOUDINARY API

router.delete('/photo', 
  photoController.deleteCloudinary, 
  // photoController.deleteFromSQL, 
  photoController.deleteFromEventPhotosSQL,
  (req, res, next) => {
  res.status(200).json({  });
})

router.put('/photo', 
// photoController.uploadPhoto,
photoController.uploadDummyPhoto, 
// eventController.updatePhoto, 
photoController.addDummyToSQL,
eventController.getOneEvent, 
// photoController.getDummyPhotoByTag,
photoController.getDummyPhotosSQL,
(req, res, next) => {
  res.status(200).json({ event : res.locals.event })
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
router.post('/inviteListGet',
  inviteController.inviteListGet,
  (req, res) =>{
    res.status(202).json({invites: res.locals.data})
})

router.post('/inviteFilter',
  inviteController.userList,
  eventController.getAttendeesOneEvent,
  inviteController.pendingInvites,
  inviteController.filterUsers,
  (req, res) => {
    res.status(202).json({users: res.locals.availableUsers})
})

router.post('/invite',
  inviteController.newInvite,
  (req, res) =>{
    res.status(202)
})

router.post('/inviteAttend', inviteController.getDatafromInvite, inviteController.addInvitetoEvents, inviteController.removeFromInvite, (req, res) =>{
  res.status(202)
})

router.post('/inviteDecline', inviteController.removeFromInvite, (req, res) =>{
  res.status(202)
})

//DELETE an event
router.delete('/events/:id',

  eventController.deleteUsersAndEvents,
  eventController.deleteInviteEvent,
  eventController.deleteEvent,
  (req,res) =>{
    return res.status(200).json("User has been deleted")
  }
)

//update

router.put('/events/:id',
  // eventController.updateEventPhotos, 

  eventController.updateUsersAndEvents,
  eventController.updateEvents,
  // eventController.allEvents,
  (req,res) => {
    return res.status(200).json("Events has been updated")
  }
)


router.post('/dummy', 
photoController.uploadDummyPhoto, 
photoController.addDummyToSQL, 
(req, res, next) => {
  return res.status(200).json(res.locals.photoUrl);
})
// photoController.getDummyPhotoByTag
router.get('/dummy/:tag', 
photoController.getDummyPhotosSQL, 
(req, res, next) => {
  return res.status(200).json(res.locals.photoUrl);
})


module.exports = router;
