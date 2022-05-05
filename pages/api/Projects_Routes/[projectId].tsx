import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const { projectId } = req.query;
  console.log("====================================");
  console.log(req.method);
  console.log("Project ID: ", projectId);
  console.log("====================================");

  switch (req.method) {
    case "GET":
      try {
        const usersProjects = await prisma.project.findMany({
          where: { id: parseInt(projectId) }, // TODO if i move this route here, change name of query to id, to make more sense
        });

        console.log("====================================");
        console.log("Retrieved Projects: ", usersProjects);
        console.log("====================================");

        res.json(usersProjects);
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
      break;

    case "POST":
      console.log("====================================");
      console.log("The REQ From POST Projects: ", req.body);

      res.json({ message: "will finish this route tomorrow" });

    // try {
    //   const createdSubtitle = await prisma.subtitle.create({
    //     data: {
    //       inTime,
    //       outTime,
    //       text,
    //       inTimeVTT,
    //       outTimeVTT,
    //       project: {
    //         connect: { id: 1 },
    //       },
    //     },
    //   });
    //   console.log("====================================");
    //   console.log("Created Subtitle: ", createdSubtitle);
    //   res.json(createdSubtitle);
    //   console.log("====================================");
    // } catch (error) {
    //   console.log("====================================");
    //   console.log(error);
    //   console.log("====================================");
    // }

    case "DELETE":
      console.log("====================================");
      console.log("The REQ From DELETE Project: ", projectId);
      try {
        const deletedProject = await prisma.subtitle.delete({
          where: {
            id: projectId,
          },
        });
        console.log("====================================");
        console.log("Deleted Project: ", deletedProject);
        res.json(deletedProject);
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
