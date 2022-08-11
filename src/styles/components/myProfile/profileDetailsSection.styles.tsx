// styled components
import styled from "styled-components";

export const ProfileDetailsDiv = styled.div`
  display: flex;
  margin: 1.4rem 0 1.5rem 0rem;
  background: #fff;
  border-radius: 0.3125rem;
  box-shadow: 0px 9px 12px 1px rgb(1 1 1 / 13%);
`;

export const ProfileImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 11rem;
  height: 18.75rem;
  color: #fff;
  background: #058ec6;
  border-radius: 0.3125rem 0 0 0.3125rem;
`;

export const ProfileImageTextSpan = styled.span`
  font-family: Maersk Headline;
  font-size: 56px;
  line-height: 56px;
  letter-spacing: 0em;
`;

export const ProfileDetailsTextDiv = styled.div`
  width: 100%;
  padding: 1.2rem;
`;

export const ProfileNameH2 = styled.h2`
  margin-bottom: 1.4rem;
  padding-bottom: 1.4rem;
  border-bottom: 0.0625rem solid #dbdbdb;
  font-family: Maersk Headline;
  font-size: 1.625rem;
  font-weight: 300;
  line-height: 2rem;
  letter-spacing: 0em;
  text-align: left;
`;

export const ProfileGroupsDiv = styled.div`
  width: 100%;
`;

export const ProfileGroupsHeaderH4 = styled.h4`
  margin-bottom: 1.4rem;
  font-family: Maersk Text;
  font-size: 1em;
  font-weight: 800;
  line-height: 1.4rem;
  letter-spacing: 0em;
  text-align: left;
`;

export const ProfileGroupsBodyUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 4rem;
  margin-left: 1.1rem;
`;
