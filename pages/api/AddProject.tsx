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
  const form = new formidable.IncomingForm();
  form.uploadDir = "./uploads";
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    console.log(
      "========================================================================"
    );
    console.log(fields);
    console.log("--------");
    console.log(files.videoFile.path);
    console.log(
      "========================================================================"
    );

    // * Upload Video file to cloudinary and save Url to database

    const uploadResponseFromCloudinary = await cloudinary.uploader.upload(
      files.videoFile.path,
      {
        upload_preset: "subit",
        resource_type: "video",
      }
    );

    console.log(
      "========================================================================"
    );
    console.log(
      "Cloudinary upload ID: ",
      uploadResponseFromCloudinary.public_id
    );
    console.log(
      "========================================================================"
    );

    // * ID used to programatically delete project from cloudinary later
    const cloudID = uploadResponseFromCloudinary.public_id;

    // * Videoes would be too large, so I saved the vidoe to cloudinary, and then video url to video in DB

    const videoURL = uploadResponseFromCloudinary.url;

    // const userId = req.params.userId;

    const { title, description } = fields;

    // TODO DYNAMICALLY GET USER ID
    const result = await prisma.project.create({
      data: {
        userId: 1,
        title,
        description,
        videoURL,
        cloudID,
      },
    });

    // console.log(
    //   "========================================================================"
    // );
    // console.log("Response From Creating Project in DB: ", result);
    // console.log(
    //   "========================================================================"
    // );

    // const responseFromCreatingProject = await Project.create({
    //   userId,
    //   videoURL,
    //   title,
    //   genre,
    //   description,
    //   cloudId,
    // });

    res.status(200).json(result);
  });
};
