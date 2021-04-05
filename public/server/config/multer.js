const Multer = require("multer");
const path = require("path");

const imageStorage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "..", "..", "uploads", "images"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);

    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const pdfStorage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "..", "..", 'uploads', 'invoices'))
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);

    cb(null, `${name}-${Date.now()}${ext}`)
  }
})

const multerImage = Multer({ storage: imageStorage });

const multerPDF = Multer({ storage: pdfStorage });

module.exports = { multerImage, multerPDF };
