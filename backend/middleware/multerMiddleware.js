import multer from "multer";
import path from "path";

/** ✅ Define File Storage Strategy (Store in Memory before Uploading to Cloudinary) */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Temporary folder before Cloudinary upload
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

/** ✅ Define File Filter (Allow only images & videos) */
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/mov"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos are allowed."), false);
  }
};

/** ✅ Configure Multer Upload Middleware */
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export default upload;
