import React, { useState } from "react";
import styled from "styled-components";
import { rhythm, DarkGray, gutter } from "../lib";
import { useDrop } from "react-dnd";
import { DndTypes } from "../App";
import Gif from "./Gif";

const Container = styled.section`
  border: 4px dashed ${DarkGray};
  min-height: ${rhythm(10)}px;
  padding: 5px;
`;

const StyledDropzone = styled.div`
  display: grid;
  /* 4 column layout for bigger screens */
  grid-template-columns: repeat(4, 1fr);
  gap: ${gutter / 2}px;

  @media (max-width: 768px) {
    /* 2 column layout for smaller screens */
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Title = styled.h4`
  margin-left: 1.33em;
`;

const DropZone = () => {
  const [dropped, setDropped] = useState([]);

  const [, drop] = useDrop({
    accept: DndTypes.RESULT,
    drop: (item, monitor) => {
      // This will keep the dropped items unique
      const updated = [...new Set([...dropped, item.id])];
      setDropped(updated);
      return { name: "Dropzone Area" };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <Container ref={drop}>
      <Title>Drag GIFs here</Title>
      <StyledDropzone>
        {dropped.map((gif) => {
          return (
            <Gif
              src={gif.images.fixed_height.webp}
              alt={gif.title}
              key={gif.id}
            />
          );
        })}
      </StyledDropzone>
    </Container>
  );
};

export default DropZone;
