import multer from "multer";
import path from "path";

/** ✅ Define Allowed File Types */
const allowedFileTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/mov"];

/** ✅ Define Storage Strategy */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Temporary folder before Cloudinary upload
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

/** ✅ Define File Filter */
const fileFilter = (req, file, cb) => {
  if (!file) {
    console.error("❌ No file uploaded!");
    return cb(new Error("No file uploaded!"), false);
  }

  if (allowedFileTypes.includes(file.mimetype)) {
    console.log(`✅ File accepted: ${file.originalname} (${file.mimetype})`);
    cb(null, true);
  } else {
    console.error(`❌ Invalid file type: ${file.originalname} (${file.mimetype})`);
    cb(new Error("Invalid file type. Only images and videos are allowed."), false);
  }
};

/** ✅ Configure Multer */
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 }, // 25MB limit
});

/** ✅ Export Middleware */
export default upload;
