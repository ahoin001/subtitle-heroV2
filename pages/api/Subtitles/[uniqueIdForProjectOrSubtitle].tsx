import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const { uniqueIdForProjectOrSubtitle } = req.query;
  console.log("====================================");
  console.log(req.method);
  console.log("Project ID: ", uniqueIdForProjectOrSubtitle);
  console.log("====================================");
  switch (req.method) {
    case "GET":
      // TODO Add a 'where' filter to only return subtitles of specific project by project id
      try {
        const theSubtitlesFromThisProject = await prisma.subtitle.findMany({
          where: { projectId: parseInt(uniqueIdForProjectOrSubtitle) },
        });

        console.log("====================================");
        console.log("Retrieved Subtitles: ", theSubtitlesFromThisProject);
        console.log("====================================");

        res.json(theSubtitlesFromThisProject);
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
      break;

    case "POST":
      console.log("====================================");
      console.log("The REQ From POST Subtitles: ", req.body);

      const { inTime, outTime, text, inTimeVTT, outTimeVTT } = req.body;

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
        console.log("====================================");
        console.log("Created Subtitle: ", createdSubtitle);
        res.json(createdSubtitle);
        console.log("====================================");
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }

    case "DELETE":
      console.log("====================================");
      console.log(
        "The REQ From DELETE Subtitles: ",
        uniqueIdForProjectOrSubtitle
      );
      try {
        const deletedSubtitle = await prisma.subtitle.delete({
          where: {
            id: parseInt(uniqueIdForProjectOrSubtitle),
          },
        });
        console.log("====================================");
        console.log("Deleted Subtitle: ", deletedSubtitle);
        res.json(deletedSubtitle);
        console.log("====================================");
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }

      break;
    default:
      res.status(405).end("Method Not Allowed");
      break;
  }
};
