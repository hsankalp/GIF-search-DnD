import React from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import { DndTypes } from "../App";
import Gif from "./Gif";

const Container = styled.div`
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
`;

const DraggableGif = ({ slug }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id: slug, type: DndTypes.RESULT },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(`${item} dropped into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Container ref={drag} isDragging={isDragging}>
      <Gif src={slug.images.fixed_height.webp} alt={slug.title} />
    </Container>
  );
};

export default DraggableGif;
