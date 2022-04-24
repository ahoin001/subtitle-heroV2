import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  console.log("The REQ From Signup: ", req);
  const { email, password } = req.data;

  //   const session = await getSession({ req });
  const result = await prisma.user.create({
    data: {
      email,
      password,
    },
  });
  res.json(result);
}
