// react and next auth
import { ReactNode } from "react";

// components
import { Box } from "@anchor/react-components";
import AppHeader from "../header/appHeader";

// styles
import { Content } from "@styles/layout/layout.styles";

const Layout = ({ children, appName }: { children: ReactNode; appName: string }) => {
  return (
    <Box>
      <AppHeader appName={appName} />
      <Content>{children}</Content>
    </Box>
  );
};

export default Layout;
