require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dkxftbzuu',
  api_key: 545886881446759,
  api_secret: 'vM5XIZptoGMNNR7O9BZ152kyv40',
});

module.exports = { cloudinary };