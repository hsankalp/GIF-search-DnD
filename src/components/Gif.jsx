import React, { useState } from "react";
import styled from "styled-components";
import { White, LightGray } from "../lib";

const Image = styled.img`
  display: block;
  /* Shows a GREY box if the image is still loading */
  background-color: ${({ loaded }) => (loaded ? White : LightGray)};
  object-fit: contain;
`;

const Gif = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => setLoaded(true);

  return (
    <Image
      src={src}
      alt={alt}
      width="100%"
      height="170px"
      onLoad={handleLoad}
      loaded={loaded}
    />
  );
};

export default Gif;
