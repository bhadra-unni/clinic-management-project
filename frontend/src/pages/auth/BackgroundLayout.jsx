import { Box } from "@mui/material";
import backgroundImage from "/src/assets/photo.jpg";
import Navbar from "./Navbar";

const BackgroundLayout = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Background image + overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: ` url(${backgroundImage}) center/cover no-repeat`,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", px: 2, py: 4 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default BackgroundLayout;
