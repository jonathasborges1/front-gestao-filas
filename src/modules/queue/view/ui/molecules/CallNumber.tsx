import { Box, Typography } from "@mui/material";

export default function CallNumber({ value }: { value?: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          letterSpacing: 2,
          border: "1px solid",
          borderColor: "neutral.dark",
          borderRadius: 2,
          p: 1.5,
        }}
      >
        {value ?? "— — — —"}
      </Typography>
    </Box>
  );
}
