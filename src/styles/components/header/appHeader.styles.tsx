import Image from "next/image";
import styled from "styled-components";
import { Icon, Typography, Box } from "@anchor/react-components";

export const Banner = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 4px;
`;

export const Header = styled(Box)`
  position: fixed;
  top: 4px;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 68px;
`;

export const MaerskLogoContainer = styled.section`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const MaerskLogo = styled.img`
  width: 160px;
  height: 64px;
`;

export const HeaderIcon = styled(Icon)`
  cursor: pointer;
`;

export const UserAvatar = styled(Image)`
  border-radius: 50%;
  cursor: pointer;
`;

export const AppName = styled(Typography)`
  margin-left: 0.5rem;
  border-left: 1px solid ${({ theme }) => theme.colors.functional.grey["300"]};
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  & i {
    margin-right: 0.5rem;
  }
`;
