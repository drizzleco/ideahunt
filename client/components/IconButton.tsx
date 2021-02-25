import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import styled from "styled-components/native";

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const IconButton = ({ icon, onPress, color }) => {
  return (
    <IconContainer onPress={onPress}>
      <FontAwesomeIcon icon={icon} color={color} />
    </IconContainer>
  );
};

export default IconButton;
