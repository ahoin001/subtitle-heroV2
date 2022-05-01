import prisma from "../../lib/prisma";

export default async (req, res) => {
  console.log("====================================");
  console.log(req.method);
  switch (req.method) {
    case "GET":
      console.log("====================================");
      console.log("The REQ From Get Subtitles: ", req);

      // TODO Add a 'where' filter to only return subtitles of specific project
      // const retrievedSubtitles = await prisma.subtitle.findMany();
      // res.json(retrievedSubtitles);
      break;

    case "POST":
      console.log("====================================");
      console.log("The REQ From POST Subtitles: ", req.body);

      const { inTime, outTime, text, inTimeVTT, outTimeVTT } = req.body;

      console.log("====================================");

      try {
        const createdSubtitle = await prisma.subtitle.create({
          data: {
            inTime,
            outTime,
            text,
            inTimeVTT,
            outTimeVTT,
            project: {
              connect: { id: 1 },
            },
          },
        });
        console.log("Created Subtitle: ", createdSubtitle);
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }

      // res.json(createdSubtitle);
      // console.log("Made it to route!");

      break;
    default:
      res.status(405).end("Method Not Allowed");
      break;
  }
};
