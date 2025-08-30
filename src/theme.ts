import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#D71920" },
    background: { default: "#F6F7F9" },
  },
  typography: {
    h1: { fontSize: "3.5rem", fontWeight: 800 }, // 56px
    h2: { fontSize: "2.75rem", fontWeight: 800 }, // 44px
    h3: { fontSize: "2rem", fontWeight: 700 }, // 32px
    body1: { fontSize: "1.125rem" }, // 18px
  },
  shape: { borderRadius: 12 },
});
