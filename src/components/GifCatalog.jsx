import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import styled from "styled-components";
import { gutter, rhythm, Gray, LightGray, Blue, DarkerBlue } from "../lib";
import DraggableGif from "./DraggableGif";
import { leftArrow, rightArrow } from "../images";

const { REACT_APP_API_KEY: apiKey, REACT_APP_URL: url } = process.env;

const limit = 16;

const Container = styled.div`
  display: grid;
  /* 4 column layout for bigger screens */
  grid-template-columns: repeat(4, 1fr);
  gap: ${gutter}px;

  @media (max-width: 768px) {
    /* 2 column layout for smaller screens */
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Button = styled.button`
  margin-left: ${rhythm(2 / 3)}px;
  border: 0;
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  padding: 8px;
  background-color: ${DarkerBlue};
  :hover {
    background-color: ${Blue};
  }
  :disabled {
    cursor: unset;
    background-color: ${LightGray};
  }
  :focus:not(:focus-visible) {
    outline: 0;
  }
`;

const Count = styled.span`
  color: ${Gray};
  font-size: 14px;
`;

const Skeleton = styled.div`
  background-color: ${LightGray};
  height: 170px;
  width: 100%;
`;

const GifCatalog = ({ searchText }) => {
  const [offset, setOffset] = useState(0);
  const [gifs, setGifs] = useState([]);
  const [data, isLoading, error] = useFetch(
    `${url}?q=${searchText}&offset=${offset}&limit=${limit}&api_key=${apiKey}`,
    searchText
  );

  useEffect(() => {
    data && setGifs(data.data);
  }, [data]);

  useEffect(() => {
    setOffset(0);
  }, [searchText]);

  if (error) {
    return <h3>Something went wrong. Please try again in sometime.</h3>;
  }

  if (!data || isLoading) {
    return new Array(limit).map((num, idx) => <Skeleton key={idx} />);
  }

  const handleNext = () => {
    setOffset(offset + limit);
  };

  const handlePrev = () => {
    setOffset(offset - limit);
  };

  const hasPrev = offset !== 0;
  const hasNext = !(offset + limit >= data.pagination.total_count);

  return (
    <Wrapper>
      <Header>
        <h1>
          &ldquo;{searchText}&rdquo;{" "}
          <Count>{data.pagination.total_count.toLocaleString()} GIFs</Count>
        </h1>
        <Navigation>
          <Button onClick={handlePrev} disabled={!hasPrev}>
            <img src={leftArrow} alt="Previous Page" />
          </Button>

          <Button onClick={handleNext} disabled={!hasNext}>
            <img src={rightArrow} alt="Next Page" />
          </Button>
        </Navigation>
      </Header>
      <Container>
        {gifs.map((gif) => {
          return <DraggableGif slug={gif} key={gif.id} />;
        })}
      </Container>
    </Wrapper>
  );
};

export default GifCatalog;
