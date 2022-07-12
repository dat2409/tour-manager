const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

cloudinary.config({
  cloud_name: 'dslwabgyl',
  api_key: '115167175876521',
  api_secret: 'AQ3cYmRuoEwtsV9gDnYgCmYnxRo'
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", "gif", "svg"],
  params: (req, file) => {
    // console.log(file)
    return {
      folder: "dev",
    };
  },
});

module.exports = { storage };
