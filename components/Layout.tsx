import React from "react";
import { Box, Text } from "native-base";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box bg="muted.800" flex={1} safeArea p={4}>
      {children}
    </Box>
  );
};

export default Layout;
