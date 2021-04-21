import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "../hooks/useDebounce";
import styled from "styled-components";
import { rhythm, DarkGray } from "../lib";
import { search } from "../images";

const Container = styled.div`
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  height: 26px;
  width: auto;
  left: 10px;
  top: 10px;
`;

const StyledSearch = styled.input`
  width: 100%;
  box-sizing: border-box;
  appearance: none;
  border-radius: 0px;
  border: 1px solid ${DarkGray};
  margin-bottom: ${rhythm(2 / 3)}px;
  height: ${rhythm(2)}px;
  letter-spacing: 1px;
  font-size: 18px;
  padding: 8px 16px 8px 40px;
`;

const Search = ({ onSearch }) => {
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  // Adds delay of 500ms so that the API is called only after user stops typing
  const searchText = useDebounce(text, 500);

  useEffect(() => {
    // Sets focus to the search input as soon as component mounts
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    onSearch(searchText);
  }, [searchText]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <Container>
      <StyledSearch
        ref={inputRef}
        onChange={handleChange}
        type="text"
        placeholder="Search GIFs"
      />
      <Image src={search} alt="Search Icon" />
    </Container>
  );
};

export default Search;
