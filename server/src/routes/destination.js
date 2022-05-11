const express = require('express');
const router = express.Router();
const destinationController = require('../controller/DestinationController');
const { PrismaClient } = require('@prisma/client');
const { destination, image } = new PrismaClient();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
let multer = require('multer');

router.get('/display', destinationController.display);
router.get('/:id', destinationController.show);
router.get('/edit/:id', destinationController.edit);
// router.patch('/:id', destinationController.update);
router.delete('/:id', destinationController.delete);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/destination'))
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName)
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('File type not accepted (.png, .jpg, .jpeg)'));
    }
  }
});

router.post('/', upload.array('imagesArray', 10), (req, res, next) => {
  const reqFiles = [];

  const url = req.protocol + '://' + req.get('host')

  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push({
      url: url + '/public/images/destination/' + req.files[i].filename
    })
  }

  const { name, address, desc} = req.body;

  destination.create({
    data: {
      name,
      address,
      desc,
      images: {
        create: reqFiles
      }
    },
    include: {
      images: true
    }
  })
    .then(result => res.json(result))
})

router.get('/', destinationController.index);

module.exports = router;
