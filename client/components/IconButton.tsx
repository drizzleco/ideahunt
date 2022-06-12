import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import styled from "styled-components/native";

interface IconButtonProps {
  disabled?: boolean;
  pointerEvents?: string;
  size?: number;
  icon: IconProp;
  color?: string;
  onPress?: () => void;
}

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${(props: IconButtonProps) => (props.size ? props.size : 20)}px;
  height: ${(props: IconButtonProps) => (props.size ? props.size : 20)}px;
`;

const IconButton = (props: IconButtonProps) => {
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
