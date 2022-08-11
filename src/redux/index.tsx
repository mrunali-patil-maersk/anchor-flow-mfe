// @ts-nocheck
import { ThemeProvider } from "@anchor/react-components";
import { Provider } from "react-redux";
import { store } from "./store";

import { createGlobalStyle } from "styled-components";
import UpdateState from "./updateState";

const GlobalComponentsStyle = createGlobalStyle`

/* toastify z-index 9999999 top of modal, header and sidebar  */
:root {
  --toastify-z-index: 9999999 !important;
}

html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
  /* reset browser default */
  margin: 0;
  padding: 0;
}
`;

import "@maersk-global/fonts/maeu/fonts.css";
import "react-datepicker/dist/react-datepicker.css";
import "@anchor/react-components/dist/lib/css/global.css";
import { ReactNode } from "hoist-non-react-statics/node_modules/@types/react";
import { useSession } from "@anchor/anchor-auth/react";

export default function AnchorStoreProvider({
  children,
  session,
}: {
  children: ReactNode;
  session?: Object;
}) {
  let session1 = session;
  if (!session) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ({ data: session1 } = useSession());
  }
  return (
    <Provider store={store}>
      <GlobalComponentsStyle />
      <UpdateState session={session1} />
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
