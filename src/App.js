import React, { useState } from "react";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { rhythm, maxAppWidth } from "./lib";
import GifCatalog from "./components/GifCatalog";
import DropZone from "./components/DropZone";
import AppHeader from "./components/AppHeader";
import Search from "./components/Search";

export const DndTypes = {
  RESULT: "result",
};

const AppPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 95vh;
  max-width: ${maxAppWidth}px;
  margin-left: auto;
  margin-right: auto;
  padding: ${rhythm(2 / 3)}px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    min-height: 90vh;
  }

  ${() => {
    if (process.env.NODE_ENV !== "production") {
      return `
      img:not([alt]) {
        border: 5px dashed #c00 !important;
      }
    `;
    } else {
      return ``;
    }
  }};
`;

const App = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AppHeader />
      <AppPageContainer>
        <Search onSearch={handleSearch} />
        {searchText.length > 0 && <GifCatalog searchText={searchText} />}
        <DropZone />
      </AppPageContainer>
    </DndProvider>
  );
};

export default App;
