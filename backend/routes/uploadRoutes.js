import express from "express";
import path from "path";
import multer from "multer";
const router = express.Router();
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filestypes = /jpg|jpeg|png/;
  const extname = filestypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filestypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only please.");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
