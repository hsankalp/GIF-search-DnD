import React from "react";
import { giphy, reactLogo } from "../images";
import { rhythm, DarkGray } from "../lib";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${DarkGray};
  height: 5vh;

  @media (max-width: 768px) {
    height: 10vh;
  }

  .react-logo-animation {
    animation: App-logo-spin infinite 20s linear;
    height: ${rhythm(2)}px;
    pointer-events: none;
    margin: 16px;
  }

  .giphy-logo {
    margin-right: 16px;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const AppHeader = () => {
  return (
    <Header>
      <img src={reactLogo} className="react-logo-animation" alt="React logo" />
      <img src={giphy} className="giphy-logo" alt="Giphy logo" />
    </Header>
  );
};

export default AppHeader;
