import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import styled from "styled-components/native";

interface Props {
  size: number;
  icon: any;
  color?: string;
  onPress: () => void;
}

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${(props: Props) => (props.size ? props.size : 20)}px;
  height: ${(props: Props) => (props.size ? props.size : 20)}px;
`;

const IconButton = (props: Props) => {
  return (
    <IconContainer {...props}>
      <FontAwesomeIcon
        icon={props.icon}
        color={props.color}
        size={props.size ? props.size : 20}
      />
    </IconContainer>
  );
};

export default IconButton;
