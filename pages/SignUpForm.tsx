import Router from "next/router";
import axios from "axios";

import { UserForm } from "../components/UserForm";

const signupUserToDBRequest = async (userInfo) => {
  try {
    console.log("FIRING REQ TO EROUTE!!");
    await axios("/api/Signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(userInfo),
    });

    await Router.push("/");
  } catch (error) {
    console.error(error);
  }
};

const SignUpForm = () => {
  return <UserForm formType="signup" onSubmitToDB={signupUserToDBRequest} />;
};

export default SignUpForm;
