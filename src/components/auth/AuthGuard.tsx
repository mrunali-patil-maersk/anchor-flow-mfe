import React, { ReactNode } from "react";
import { Typography, Box } from "@anchor/react-components";
import { useSession, signIn, SessionProvider } from "@anchor/anchor-auth/react";

// import dynamic from "next/dynamic";

interface AuthGuardProps {
  children: ReactNode;
}

export const ErrorComponent = ({ error }) => {
  return (
    <Box display="flex" justifyContent="center">
      <Typography variant="h4" fontStyle="bold">
        An Error Occurred: {error.errorCode}
      </Typography>
    </Box>
  );
};

export const Loading = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Typography variant="h4" fontStyle="bold">
        Authentication in progress...
      </Typography>
    </Box>
  );
};

//const DynamicComponentWithNoSSR = dynamic(() => <Loading />, { ssr: false });

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  React.useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!isUser) signIn("azure-ad"); // If not authenticated, force log in
  }, [isUser, status]);

  if (isUser && status === "authenticated") {
    return <>{children}</>;
  }
  return <Loading />;
};

const AuthSessionProvider = ({ children, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={10 * 60}>
      <AuthGuard>{children}</AuthGuard>
    </SessionProvider>
  );
};
export default AuthSessionProvider;
