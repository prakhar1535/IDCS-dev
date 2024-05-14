import React from "react";
import { Box } from "@mui/material";
import StoT from "../components/StoT";
import java from '../java.pdf'
import PdfViewer from '../components/PdfViewer'
const StartClass = () => {
  return (
    <Box border={"1px solid red"} display={"flex"} gap={"10px"}>
      <Box
        sx={{
          backgroundColor: "black",
          height: "100vh",
          width: "70%",
        }}
      >
        <PdfViewer myFile={java}/>
      </Box>
      <Box display={"flex"} flexDirection={"column"} width={"30%"} gap={"10px"}>
        <Box
          sx={{
            backgroundColor: "black",
            height: "49vh",
          }}
        >

        </Box>
        <Box
        height={"49vh"}
          
        >
          <StoT/>
        </Box>
      </Box>
    </Box>
  );
};

export default StartClass;
