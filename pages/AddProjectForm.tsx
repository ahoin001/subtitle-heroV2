import { ProjectForm } from "../components/ProjectForm";
import useSWR from "swr";
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
    // * Display the form values
    // for (var value of projectInfo.values()) {
    //   console.log("FORMDATA VALUES: ", value);
    // }

    // const fetcher = async () => {
    //   await axios("/api/AddProject", {
    //     method: "POST",
    //     headers: { "Content-Type": `multipart/form-data` },
    //     data: projectInfo,
    //   });
    // };

    // const { data, error } = useSWR("/api/user", fetcher);

    const responseFromApi = await axios("/api/AddProject", {
      method: "POST",
      headers: { "Content-Type": `multipart/form-data` },
      data: projectInfo,
    });

    console.log(responseFromApi);

    await Router.push("/");
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
