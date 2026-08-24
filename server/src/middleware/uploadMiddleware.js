import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(null, "uploads/");
    },

    filename: (
      req,
      file,
      cb
    ) => {
      const extension =
        path.extname(
          file.originalname
        );

      const uniqueName =
        `${Date.now()}-${crypto
          .randomBytes(8)
          .toString("hex")}${extension}`;

      cb(
        null,
        uniqueName
      );
    }
  });

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "text/plain"
];

const fileFilter = (
  req,
  file,
  cb
) => {
  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type"
      ),
      false
    );
  }
};

const upload =
  multer({
    storage,

    fileFilter,

    limits: {
      fileSize:
        5 * 1024 * 1024
    }
  });

export default upload;