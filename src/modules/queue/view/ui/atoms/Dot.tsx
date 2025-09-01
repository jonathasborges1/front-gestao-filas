import { Box, Typography } from "@mui/material";

export function Dot({ bg, value }: { bg: string; value: number }) {
  return (
    <Box
      sx={{
        width: 100,
        height: 50,
        borderRadius: 1,
        bgcolor: bg,
        color: "background.default",
        display: "grid",
        placeItems: "center",
        fontWeight: 800,
      }}
    >
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
}
