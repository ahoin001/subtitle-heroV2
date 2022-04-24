import Router from "next/router";
import axios from "axios";

import { UserForm } from "../components/UserForm";

const signupUserToDBRequest = async ( userInfo) => {
  // e.preventDefault();
  try {
    // const body = userInfo;
    const res = await axios("/api/User/SignUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(userInfo),
    });

    console.log(res);
    await Router.push("/");
  } catch (error) {
    console.error(error);
  }
};

const SignUp = () => {
  return <UserForm formType="signup" onSubmitToDB={signupUserToDBRequest} />;
};

// Gets all users
// Can write serverside code
// export const getStaticProps: GetStaticProps = async () => {
//   const res = await prisma.user.findMany();
//   console.log("================= \n ", res[0]);
//   return { props: { res } };
// };

export default SignUp;
