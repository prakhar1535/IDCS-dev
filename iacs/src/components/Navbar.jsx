import { Box, Typography } from "@mui/material";
import { useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState(1);
  const options = [
    {
      title: "Start Class",
      id: 1,
      route: "/start-class",
    },
    {
      title: "Attendance",
      id: 2,
      route: "/attendance",
    },
    {
      title: "Resources",
      id: 3,
      route: "/resources",
    },
    {
      title: "Info",
      id: 4,
      route: "/info",
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "#F9F9F9",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        {options.map((item, index) => {
          return (
            <Box
              key={index}
              onClick={() => setActive(item.id)}
              sx={{
                padding: "12px",
                borderRadius: "20px",
                backgroundColor: active === item.id ? "white" : "",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: active === item.id ? "black" : "#939393",
                }}
              >
                {item.title}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default Navbar;
