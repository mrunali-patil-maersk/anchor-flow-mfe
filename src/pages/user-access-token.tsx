import { Button, Input } from "@anchor/react-components";
import { TokenInfoP, AccessTokenContainer } from "../styles/pages/user-access-token.styles";
import { useSession } from "@anchor/anchor-auth/react";

const copyToken = () => {
  const copyText = (document.querySelector("#accessToken") as HTMLInputElement).value;
  navigator.clipboard.writeText(copyText);
};

const WelcomeUser = () => {
  const { data: session } = useSession();
  const apiTokenDetails = session?.apiTokenDetails as any;
  const accessToken = apiTokenDetails.accessToken;
  const username = session?.user?.name;

  return (
    <AccessTokenContainer>
      <TokenInfoP>Welcome, {username}!!</TokenInfoP>
      <TokenInfoP>Here is your API Access Token!!</TokenInfoP>
      {accessToken && (
        <>
          <Input
            fit="medium"
            disabled={true}
            id="accessToken"
            type="text"
            variant="default"
            width={50}
            value={accessToken}
          />
          <br />
          <Button
            variant="filled"
            icon="clipboard-check"
            label="Copy"
            onClick={() => copyToken()}
          />
        </>
      )}
    </AccessTokenContainer>
  );
};

const AccessTokenComp = () => {
  return (
    <AccessTokenContainer>
      <WelcomeUser />
    </AccessTokenContainer>
  );
};
AccessTokenComp.requireAuth = true;
export default AccessTokenComp;
