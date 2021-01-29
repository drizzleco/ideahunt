import * as React from "react";
import styled from "styled-components/native";

import AuthContext from "../navigation/AuthContext";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LogoutButton = styled.Button`
  display: flex;
  width: 200px;
  background-color: blue;
  border-radius: 4px;
`;

const ProfileScreen = () => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <Container>
      <LogoutButton
        title="Log Out"
        onPress={() => {
          signOut();
        }}
      />
    </Container>
  );
};

export default ProfileScreen;
