import { Container } from "@chakra-ui/react";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Container maxW="8xl" h={"90vh"}>{children}</Container>
      <Footer />
    </>
  );
}
