import React, { useRef } from "react";
import Link from "next/link";

import { Project } from "./Project";

import { Box, Center, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
// import { ContentContainer } from "./ProjectList-Styles";

export const ProjectsList = ({ allProjects }) => {
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
      minChildWidth={{ base: "250px", md: "340px" }}
      gap={"5"}
      overflow={"scroll"}
    >
      <Link href={"/"} passHref>
        HOME
      </Link>
      {allProjects.map((project) => {
        {
          return (
            // When link clicked, pass the project object information
            <Link
              key={project.id}
              href={{ pathname: `/ProjectPage/${project.id}`, query: project }}
              passHref
            >
              <a>
                <Project project={project} />
              </a>
            </Link>
          );
        }
      })}
    </SimpleGrid>
  );
};
