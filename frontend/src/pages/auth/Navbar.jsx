import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "transparent",
      px: 3,
      py: 2,
    }}
  >
    <Typography
      variant="h4"
      fontWeight="bold"
      sx={{
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        color: "#1976d2",
      }}
    >
      ClinicCare+
    </Typography>
    <Box sx={{ display: "flex", gap: 3 }}>
      <Typography
        component={Link}
        to="/"
        sx={{
          color: "white",
          textDecoration: "none",
          fontWeight: "bold",
          textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
          fontSize: "1.25rem",
          letterSpacing: "0.01rem",
          px: 1,
        }}
      >
        Home
      </Typography>
      <Typography
        component="a"
        href="/aboutus"
        sx={{
          color: "white",
          textDecoration: "none",
          fontWeight: "bold",
          textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
          fontSize: "1.25rem",
          letterSpacing: "0.01rem",
          px: 1,
        }}
      >
        About Us
      </Typography>
      <Typography
        component={Link}
        to="/contact"
        sx={{
          color: "white",
          textDecoration: "none",
          fontWeight: "bold",
          textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
          fontSize: "1.25rem",
          letterSpacing: "0.01rem",
          px: 1,
        }}
      >
        Contact
      </Typography>
    </Box>
  </Box>
);

export default Navbar;
