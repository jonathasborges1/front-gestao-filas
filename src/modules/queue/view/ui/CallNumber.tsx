import { Box, Typography } from "@mui/material";

export default function CallNumber({ value }: { value?: string }) {
  return (
    <Box
      sx={{
        display: "inline-block",
        px: 2,
        py: 0.5,
        border: "3px solid #1F2937", // cinza-900
        borderRadius: "10px",
        bgcolor: "#F3F4F6",
      }}
    >
      <Typography sx={{ fontSize: 36, fontWeight: 900, letterSpacing: 2 }}>
        {value ?? "— — — —"}
      </Typography>
    </Box>
  );
}
