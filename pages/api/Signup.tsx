import prisma from "../../lib/prisma";

interface UserInfo {
  email: string;
  password: string;
}

export default async function handle(req, res) {
  console.log("The REQ From Signup: ", req);
  const { email, password }: UserInfo = req.body;

  //   const session = await getSession({ req });
  const result = await prisma.user.create({
    data: {
      email,
      password,
    },
  });
  res.json(result);
}
