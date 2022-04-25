import prisma from "../../lib/prisma";

import formidable from "formidable-serverless";
import cloudinary from "../../config/cloudinary-config";

interface ProjectInfo {
  title: string;
  description: string;
  videoFile: File;
}

// * Necessary or route can't consume the FormData from client
export const config = {
  api: {
    bodyParser: false, //To accept formdata
    externalResolver: true, // to remove error stalling requests
  },
};

/*******************************************************
 *
 *                   CREATE ROUTE
 *
 * *****************************************************/

export default async (req, res) => {
  console.log("INSIDE THE MIDDLEWARE");
  const form = new formidable.IncomingForm();
  form.uploadDir = "./uploads";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(err, fields, files);
  });
};
