import React, {useState} from 'react';
import {css} from "@emotion/react";
import styled from '@emotion/styled'
import ScaleLoader from "react-spinners/ScaleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const Box = styled.div`
  display: flex;
  place-content: center;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 100%;
`;

const LoadingCore = ({loading}) => {
    let [color, setColor] = useState("#00ab55");
    return (
        <>
            {loading && (
                <Box className="sweet-loading">
                    <ScaleLoader color={color} loading={loading} css={override} size={150}/>
                </Box>
            )}
        </>
    );
};

export default LoadingCore;
