import * as React from "react";
import styled from "styled-components/native";

const DefaultButton = styled.TouchableOpacity<{ color?: string }>`
  background-color: ${(props) => (props.color ? props.color : "salmon")};
  width: 200px;
  height: 40px;
  border-radius: 8px;
  padding: 4px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
`;

interface ButtonProps {
  color?: string;
  title: string;
  width?: number;
  onPress: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <DefaultButton {...props}>
      <ButtonText>{props.title}</ButtonText>
    </DefaultButton>
  );
};

export default Button;
