import { GetServerSidePropsContext } from "next";
import { getSession } from "@anchor/anchor-auth/react";

export function withRequireAuth(gssp: any) {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);

    if (!session) {
      // Redirect to signin page
      return {
        redirect: {
          destination: "/api/auth/signin/azure-ad",
          statusCode: 302,
        },
      };
    }

    return await gssp(context, session); // Continue on to call `getServerSideProps` logic
  };
}
