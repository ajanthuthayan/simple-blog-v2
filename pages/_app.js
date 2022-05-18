import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "../src/app/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
