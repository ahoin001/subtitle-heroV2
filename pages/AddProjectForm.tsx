import { ProjectForm } from "../components/ProjectForm";

import Router from "next/router";
import axios from "axios";
type ProjectFormValues = {
  title: string;
  description: string;
  genre?: string;
  videoFile: File;
};
const addProjectToDBRequest = async (projectInfo) => {
  try {
    
    console.log("FIRING ADD PROJECT TO EROUTE!!");

    // Display the values
    for (var value of projectInfo.values()) {
      console.log("FORMDATA VALUES: ", value);
    }
    const responseFromApi = await axios("/api/AddProject", {
      method: "POST",
      headers: { 'Content-Type': `multipart/form-data` },
      data: projectInfo,
    });

    console.log(responseFromApi)
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
