// styled components
import styled from "styled-components";

// components
import { Typography } from "@anchor/react-components";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#979797";
};

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 4px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #ededed;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export const ContainerText = styled(Typography)`
  margin: 16px 0;
`;

export const ThumbsContainer = styled.aside`
  display: "flex";
  flex-direction: "row";
  flex-wrap: "wrap";
  margin-top: 16px;
`;

export const Thumb = styled.div`
  border-radius: 4px;
  border: 1px solid #eaeaea;
  margin-bottom: 16px;
  max-width: 200px;
  max-height: 200px;
  padding: 4px;
  box-sizing: border-box;
`;

export const ThumbText = styled(Typography)`
  margin: 16px 0;
`;

export const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

export const Img = styled.img`
  display: block;
  width: auto;
  max-height: 190px;
`;
