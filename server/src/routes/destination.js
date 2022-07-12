const express = require("express");
const router = express.Router();
const destinationController = require("../controller/DestinationController");
const { PrismaClient } = require("@prisma/client");
const { destination, image } = new PrismaClient();
let multer = require("multer");
const { storage } = require("../../cloudinary.config");
const upload = multer({ storage });

router.get("/display", destinationController.display);
router.get("/:id", destinationController.show);
router.get("/edit/:id", destinationController.edit);
// router.patch('/:id', destinationController.update);
router.delete("/:id", destinationController.delete);

router.post("/", upload.array("imagesArray", 10), destinationController.create)
// (req, res, next) => {
//   console.log(req.body);
  // const reqFiles = [];

  // const url = req.protocol + "://" + req.get("host");

  // for (var i = 0; i < req.files.length; i++) {
  //   reqFiles.push({
  //     url: url + "/public/images/destination/" + req.files[i].filename,
  //   });
  // }

  // console.log(req.files);

  // const { name, address, desc } = req.body;

  // destination
  //   .create({
  //     data: {
  //       name,
  //       address,
  //       desc,
  //       images: {
  //         create: reqFiles,
  //       },
  //     },
  //     include: {
  //       images: true,
  //     },
  //   })
  //   .then(() => res.sendStatus(201));
  // return res.sendStatus(201);
// });

router.get("/", destinationController.index);

module.exports = router;
