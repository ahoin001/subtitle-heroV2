import "../styles/globals.css";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
