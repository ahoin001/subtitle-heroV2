import { Box } from "@chakra-ui/react";
import React from "react";

export const Header = () => {
  return (
    <Box w={"full"} pos={"relative"} p={3} bgColor={"rgba(100,21,255,0)"}>
      <div>
        <div>
          <a href="/">SubIt</a>
          <div></div>
          <div>
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </Box>
  );
};
