import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "*": {
        scrollBehavior: "smooth"
      },

      "*::-webkit-scrollbar": {
        width: "6px",
        height: "6px"
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "red.500"
      },
      "*::-webkit-scrollbar-track": {
        backgroundColor: "red.200"
      }
    }
  }
});

const Providers: React.FC = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Providers;
