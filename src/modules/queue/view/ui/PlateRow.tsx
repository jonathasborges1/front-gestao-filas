import { Box, Stack, Typography } from "@mui/material";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
export default function PlateRow({ plate }: { plate?: string }) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <CreditCardRoundedIcon sx={{ color: "text.secondary" }} />
      <Box
        sx={{
          border: "2px solid #D1D5DB",
          borderRadius: 10,
          px: 1.25,
          py: 0.25,
          bgcolor: "#FFF",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 700, letterSpacing: 1.5 }}>
          {plate?.toUpperCase() ?? "— — — —"}
        </Typography>
      </Box>
    </Stack>
  );
}
