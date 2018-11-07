import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_KEY_ID
});

const ACL = "public-read";

export const avatarUpload = multer({
  storage: multerS3({
    s3,
    acl: ACL,
    bucket: "wetube/avatars"
  })
});
