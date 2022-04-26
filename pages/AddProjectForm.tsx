import { ProjectForm } from "../components/ProjectForm";

import Router from "next/router";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

type ProjectFormValues = {
  title: string;
  description: string;
  genre?: string;
  videoFile: File;
};

// * May use react-query type package for requests, but for now everything works fine

let responseFromApi;

const addProjectToDBRequest = async (projectInfo) => {
  try {
    // * Display the form values
    // for (var value of projectInfo.values()) {
    //   console.log("FORMDATA VALUES: ", value);
    // }

    responseFromApi = await axios("/api/AddProject", {
      method: "POST",
      headers: { "Content-Type": `multipart/form-data` },
      data: projectInfo,
    });

    console.log(responseFromApi);

    // await Router.push("/");
  } catch (error) {
    console.error(error);
  }
};

const AddProjectForm = () => {
  return (
    <>
      <ProjectForm handleAddProjectToDB={addProjectToDBRequest} />
    </>
  );
};

export default AddProjectForm;
