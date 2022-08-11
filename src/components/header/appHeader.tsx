/* eslint-disable @next/next/no-img-element */
import NextLink from "next/link";
import { Box, Typography } from "@anchor/react-components";
import {
  AppName,
  UserAvatar,
  HeaderIcon,
  Banner,
  Header,
  MaerskLogo,
  MaerskLogoContainer,
} from "@styles/components/header/appHeader.styles";
import { useAppSelector } from "src/redux/hook";
import { selectUser } from "src/redux/selectors/userSelector";

interface AppHeaderType {
  appName: string;
}

const AppHeader = ({ appName }: AppHeaderType) => {
  const graphData = useAppSelector(selectUser);
  const { name: userName, userAvatar } = graphData || {};

  return (
    <Box display="flex" flexDirection="column">
      <Banner bg="primary.blue.600" height={4} />
      <Header
        display="flex"
        justifyContent="space-between"
        px={24}
        height={68}
        borderBottom="1px solid"
        borderColor="functional.grey.200"
        bg="functional.grey.50"
      >
        <Box display="flex" alignItems="center">
          <NextLink href="/">
            <a>
              <MaerskLogoContainer>
                <MaerskLogo src="/assets/maersk-logo.svg" alt="Maersk Logo" />
                <AppName variant="h4" fontStyle="normal">
                  <HeaderIcon size="24" name="anchor" />
                  {appName}
                </AppName>
              </MaerskLogoContainer>
            </a>
          </NextLink>
        </Box>
        <Box display="flex" alignItems="center">
          <Box>
            <Typography variant="body2" fontStyle="normal">
              {userName}
            </Typography>
          </Box>
          <Box display="flex" ml={10}>
            {!userAvatar && (
              <NextLink href="/my-profile">
                <a>
                  <HeaderIcon size="24" name="user-circle" />
                </a>
              </NextLink>
            )}
            {userAvatar && (
              <NextLink href="/my-profile">
                <a>
                  <UserAvatar src={userAvatar || null} alt={userName} width={24} height={24} />
                </a>
              </NextLink>
            )}
          </Box>
        </Box>
      </Header>
    </Box>
  );
};

export default AppHeader;
