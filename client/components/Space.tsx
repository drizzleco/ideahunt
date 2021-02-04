import styled from "styled-components/native";

type WidthHeightSpace = {
  width?: number;
  height?: number;
};

const Space = styled.View<WidthHeightSpace>`
  display: flex;
  width: ${(props) => props.width || 0}px;
  height: ${(props) => props.height || 0}px;
`;

export default Space;
