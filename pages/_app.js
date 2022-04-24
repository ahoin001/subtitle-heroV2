import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "jotai";

import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
