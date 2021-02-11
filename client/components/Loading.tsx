import * as React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Indicator = styled.ActivityIndicator``;

const Loading = ({
  color,
  size,
}: {
  color: string;
  size: "small" | "large";
}) => (
  <Container>
    <Indicator color={color} size={size} />
  </Container>
);

export default Loading;
