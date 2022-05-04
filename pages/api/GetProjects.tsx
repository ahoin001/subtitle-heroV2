import prisma from "../../lib/prisma";

interface UserInfo {
  email: string;
  password: string;
}

export default async function handle(req, res) {
  console.log("====================");
  // console.log("The REQ From Get Projects: ", req);

  //   const session = await getSession({ req });
  const result = await prisma.project.findMany();
  res.json(result);
}
