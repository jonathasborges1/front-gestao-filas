import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    fontSize: 28,
  },
});

theme = createTheme(theme, {
  palette: {
    primary: { main: "#D71920" },
    background: { default: "#F6F7F9", paper: "#FFFFFF" },
    success: { main: "#2BB673" },
    info: { main: "#2196F3" },
    error: { main: "#E30613" },
    grey: {
      100: "#F7F7F7",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
    },
    text: {
      primary: "#101828",
      secondary: "#667085",
    },
    neutral: {
      dark: "#1F2937",
      rose: "#FFE4E6",
      red: "#D71920",
      red1: "#EF4444",
    },
  },
  typography: {
    h1: { fontSize: theme.typography.pxToRem(96), fontWeight: 800 },
    h2: { fontSize: theme.typography.pxToRem(72), fontWeight: 800 },
    h3: { fontSize: theme.typography.pxToRem(56), fontWeight: 700 },
    h4: { fontSize: theme.typography.pxToRem(40), fontWeight: 700 },
    h5: { fontSize: theme.typography.pxToRem(32), fontWeight: 700 },
    h6: { fontSize: theme.typography.pxToRem(28), fontWeight: 700 },

    body1: { fontSize: theme.typography.pxToRem(24) },
    body2: { fontSize: theme.typography.pxToRem(20) },
  },
  shape: { borderRadius: 12 },
});

export { theme };
