// @ts-nocheck
// react and next
import { NextComponentType } from "next";
import type { AppProps } from "next/app";
import { useState } from "react";

// components
import { Toast } from "@anchor/react-components";
import AnchorAuthGuard from "@anchor/anchor-auth/AnchorAuthGuard";

import Layout from "@/components/layout/layout";
import SidebarLayout from "@/components/layout/sidebarLayout";

// styles
//import "../styles/globals.css";
import AnchorStoreProvider from "src/redux";

export type NextAppProps = AppProps & {
  Component: NextComponentType & {
    requireAuth: boolean;
  };
};

function MyApp({ Component, pageProps }: NextAppProps) {
  const [sidebarIsExpanded, setSidebarIsExpanded] = useState(true);

  const handleToggleClick = (isExpanded) => {
    setSidebarIsExpanded(isExpanded);
  };

  return (
    <>
      {Component.requireAuth ? (
        <AnchorAuthGuard pageProps={pageProps}>
          <AnchorStoreProvider pageProps={pageProps}>
            <Toast />
            <Layout appName={"Anchor Flow"}>
              <SidebarLayout handleToggleClick={(isExpanded) => handleToggleClick(isExpanded)}>
                <Component {...pageProps} sidebarIsExpanded={sidebarIsExpanded} />
              </SidebarLayout>
            </Layout>
          </AnchorStoreProvider>
        </AnchorAuthGuard>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
export default MyApp;
