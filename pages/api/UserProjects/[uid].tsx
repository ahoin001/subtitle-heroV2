import prisma from "../../../lib/prisma";

interface UserInfo {
  email: string;
  password: string;
}

export default async function handle(req, res) {
  const { uid } = req.query;
  // console.log("====================================");
  // console.log(req.method);
  // console.log(uid);
  // console.log("====================================");

  //   const session = await getSession({ req });
  const result = await prisma.project.findMany({
    where: { userId: parseInt(uid) },
  });
  // console.log("====================================");
  // console.log(result);
  // console.log("====================================");
  res.json(result);
}
