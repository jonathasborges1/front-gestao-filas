import { Box } from "@mui/material";
import logo from "../../../../assets/logo-atem.svg"; // coloque o SVG em src/assets

export default function HeaderBar() {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        height: 72,
        display: "flex",
        alignItems: "center",
        px: 3,
      }}
    >
      <img src={logo} alt="Atem" height={28} />
    </Box>
  );
}
