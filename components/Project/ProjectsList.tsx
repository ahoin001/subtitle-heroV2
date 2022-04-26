import React, { useRef } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import { Project } from "./Project";

import { Box, Container, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
// import { ContentContainer } from "./ProjectList-Styles";

export const ProjectsList = () => {
  // ******************************************************

  //   const counter = useRef(0);

  //   const videoLoaded = () => {
  //     counter.current += 1;
  //     // console.log('VIDEO LOADING LENGTH: ', projectsOfUser.length)
  //     // console.log('VIDEO LOADING COUNTER: ', counter.current)

  //     if (counter.current >= projectsOfUser.length) {
  //       setIsloading(false);
  //     }
  //   };

  // ******************************************************

  // TODO make it dynamice to accept userid and retrieve their projects
  const { isLoading, error, data, isFetching } = useQuery(
    "projectsFromUser",
    async () => await axios.get("/api/GetProjects")
  );

  let projectListItems;

  //   * Map data to return project components
  //   if (projectsOfUser) {
  //     projectListItems = projectsOfUser.map((projectFromList, i) => (
  //       <React.Fragment key={projectFromList.id}>
  //         <Project onVideoLoaded={videoLoaded} projectInfo={projectFromList} />
  //       </React.Fragment>
  //     ));
  //   }

  return (
    <SimpleGrid
      bgColor={"blue.300"}
    //   w="full"
      minChildWidth={{ base: '250px', md: '340px', lg: '386px' }}
      gap={"5"}
      overflow={"hidden"}
    >
      {isFetching ? (
        <Spinner />
      ) : (
        data.data.map((project) => {
          {
            return <Project project={project} />;
          }
        })
      )}
    </SimpleGrid>
  );
};
