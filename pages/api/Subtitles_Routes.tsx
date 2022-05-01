import prisma from "../../lib/prisma";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      console.log("====================");
      console.log("The REQ From Get Subtitles: ", req);

      // TODO Add a 'where' filter to only return subtitles of specific project
      const retrievedSubtitles = await prisma.subtitle.findMany();
      res.json(retrievedSubtitles);
      break;
    case "POST":
      console.log("====================");
      console.log("The REQ From POST Subtitles: ", req);

      // const createdSubtitle = await prisma.subtitle.create({
      //   data: {
      //     projectId,
      //     inTime,
      //     outTime,
      //     text,
      //     inTimeVTT,
      //     outTimeVTT,
      //   },
      // });

      // console.log("Created Subtitle: ",createdSubtitle)
      // res.json(createdSubtitle);

      break;
    default:
      res.status(405).end("Method Not Allowed");
      break;
  }
};
